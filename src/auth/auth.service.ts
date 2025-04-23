import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshTokenEntity } from 'src/entities/refreshToken.entity';
import { UserEntity } from 'src/entities/user.entity';
import { formatDate } from 'src/utils/utils';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenPayloadDto } from './dtos/req/refreshToken.payload.dto';
import { UserChangePasswordPayloadDto } from './dtos/req/user.change.password.payload.dto';
import { UserLoginPayloadDto } from './dtos/req/user.login.payload.dto';
import { UserRegisterPayloadDto } from './dtos/req/user.register.payload.dto';
import { UserLoginResponseDto } from './dtos/res/user.login.response.dto';
import { UserProfileResponseDto } from './dtos/res/user.profile.response.dto';
import { UserRegisterResponseDto } from './dtos/res/user.register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: UserRegisterPayloadDto,
  ): Promise<UserRegisterResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (registerDto.password !== registerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      parseInt(process.env.SALT_ROUNDS || '10'),
    );
    const payload = {
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      email: registerDto.email,
      password: hashedPassword,
    };

    const newUser = this.userRepository.create(payload);
    const savedUser = await this.userRepository.save(newUser);

    const response: UserRegisterResponseDto = {
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
    };
    return response;
  }

  async login(loginDto: UserLoginPayloadDto): Promise<UserLoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateToken(user.id);

    await this.userRepository.update(
      { id: user.id },
      { last_activity: new Date() },
    );

    const response: UserLoginResponseDto = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return response;
  }

  async getProfile(userId: number): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const response: UserProfileResponseDto = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      last_login: formatDate(user.last_activity),
    };

    return response;
  }

  async changePassword(
    userId: number,
    changePasswordDto: UserChangePasswordPayloadDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (
      changePasswordDto.new_password !== changePasswordDto.new_password_confirm
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.old_password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(
      changePasswordDto.new_password,
      parseInt(process.env.SALT_ROUNDS || '10'),
    );

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return {
      message: 'Password changed successfully',
    };
  }

  async refresh(refreshTokenDto: RefreshTokenPayloadDto) {
    const token = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshTokenDto.refreshToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.refreshTokenRepository.delete(token.id);

    return this.generateToken(token.user_id);
  }

  async generateToken(userId: number) {
    const payload = { userId };
    const refreshToken = uuidv4();

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    await this.generateRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateRefreshToken(token: string, userId: number) {
    const expireDate = new Date();
    expireDate.setDate(
      expireDate.getDate() +
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN_INT || '3'),
    );

    const refreshToken = this.refreshTokenRepository.create({
      token: token,
      user_id: userId,
      expiryDate: expireDate,
    });
    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken.token;
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenPayloadDto } from './dtos/req/refreshToken.payload.dto';
import { UserChangePasswordPayloadDto } from './dtos/req/user.change.password.payload.dto';
import { UserLoginPayloadDto } from './dtos/req/user.login.payload.dto';
import { UserRegisterPayloadDto } from './dtos/req/user.register.payload.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: UserRegisterPayloadDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginPayloadDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenPayloadDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.userId);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Body() changePasswordDto: UserChangePasswordPayloadDto,
    @Req() req,
  ) {
    return this.authService.changePassword(req.userId, changePasswordDto);
  }
}

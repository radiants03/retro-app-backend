import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { BoardEntity } from './entities/board.entity';
import { CardEntity } from './entities/card.entity';
import { CategoryEntity } from './entities/category.entity';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from './entities/user.entity';
import { RefreshTokenEntity } from './entities/refreshToken.entity';
import { BoardsModule } from './boards/boards.module';
import { CategoriesModule } from './categories/categories.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        type: 'mysql',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [
          UserEntity,
          BoardEntity,
          CategoryEntity,
          CardEntity,
          CommentEntity,
          RefreshTokenEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      BoardEntity,
      CategoryEntity,
      CardEntity,
      CommentEntity,
      RefreshTokenEntity,
    ]),
    AuthModule,
    BoardsModule,
    CategoriesModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}

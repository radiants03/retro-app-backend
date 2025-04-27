import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { CardEntity } from 'src/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}

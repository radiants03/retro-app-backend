import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommentCreatePayloadDto } from 'src/auth/dtos/req/comment.create.payload.dto';
import { CommentUpdatePayloadDto } from 'src/auth/dtos/req/comment.update.payload.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CommentsService } from './comments.service';

@ApiBearerAuth()
@Controller('dashboard/boards/categories/cards/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('search/:cardId')
  @UseGuards(AuthGuard)
  async getAllComments(@Param('cardId') cardId: number) {
    return this.commentsService.getAllComments(cardId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createComment(@Body() commentCreatePayloadDto: CommentCreatePayloadDto) {
    return this.commentsService.createComment(commentCreatePayloadDto);
  }

  @Get(':cardId/:commentId')
  @UseGuards(AuthGuard)
  async getCommentById(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.getCommentById(cardId, commentId);
  }

  @Put(':cardId/:commentId')
  @UseGuards(AuthGuard)
  async updateComment(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
    @Body() commentUpdatePayloadDto: CommentUpdatePayloadDto,
  ) {
    return this.commentsService.updateComment(
      cardId,
      commentId,
      commentUpdatePayloadDto,
    );
  }

  @Delete(':cardId/:commentId')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.deleteComment(cardId, commentId);
  }
}

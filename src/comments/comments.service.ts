import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentCreatePayloadDto } from 'src/auth/dtos/req/comment.create.payload.dto';
import { CommentUpdatePayloadDto } from 'src/auth/dtos/req/comment.update.payload.dto';
import { CommentAllResponseDto } from 'src/auth/dtos/res/comment.all.response.dto';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly cardRepository: Repository<CommentEntity>,
  ) {}

  async getAllComments(cardId: number): Promise<CommentAllResponseDto[]> {
    const comments = await this.cardRepository.find({
      where: { card: { id: cardId } },
      order: { created_date: 'ASC' },
    });

    const response: CommentAllResponseDto[] = comments.map((comment) => {
      return {
        username: comment.username,
        content: comment.content,
      };
    });

    return response;
  }

  async createComment(
    commentCreatePayloadDto: CommentCreatePayloadDto,
  ): Promise<CommentAllResponseDto> {
    const comment = this.cardRepository.create({
      card: { id: commentCreatePayloadDto.cardId },
      content: commentCreatePayloadDto.content,
      username: commentCreatePayloadDto.username,
    });
    const savedComment = await this.cardRepository.save(comment);

    const response: CommentAllResponseDto = {
      username: savedComment.username,
      content: savedComment.content,
    };
    return response;
  }

  async getCommentById(
    cardId: number,
    commentId: number,
  ): Promise<CommentAllResponseDto> {
    const comment = await this.cardRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    const response: CommentAllResponseDto = {
      username: comment.username,
      content: comment.content,
    };
    return response;
  }

  async updateComment(
    cardId: number,
    commentId: number,
    commentUpdatePayloadDto: CommentUpdatePayloadDto,
  ): Promise<CommentAllResponseDto> {
    const comment = await this.cardRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    comment.content = commentUpdatePayloadDto.content;
    const updatedComment = await this.cardRepository.save(comment);

    const response: CommentAllResponseDto = {
      username: updatedComment.username,
      content: updatedComment.content,
    };
    return response;
  }

  async deleteComment(cardId: number, commentId: number): Promise<string> {
    const comment = await this.cardRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    await this.cardRepository.remove(comment);

    return 'Comment deleted successfully';
  }
}

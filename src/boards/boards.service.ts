import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardAllPayloadDto } from 'src/auth/dtos/req/board.all.payload.dto';
import { BoardCreatePayloadDto } from 'src/auth/dtos/req/board.create.payload.dto';
import { BoardUpdatePayloadDto } from 'src/auth/dtos/req/board.update.payload.dto';
import { BoardAllResponseDto } from 'src/auth/dtos/res/board.all.response.dto';
import { BoardCreateResponseDto } from 'src/auth/dtos/res/board.create.response.dto';
import { BoardSingleResponseDto } from 'src/auth/dtos/res/board.single.response.dto copy';
import { BoardEntity } from 'src/entities/board.entity';
import { SortBy } from 'src/utils/constants';
import { formatDate } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards(
    boardAllPayloadDto: BoardAllPayloadDto,
  ): Promise<BoardAllResponseDto[]> {
    const boards = await this.boardRepository.find({
      order: { created_date: boardAllPayloadDto.sortBy || SortBy.DESC },
    });

    const response: BoardAllResponseDto[] = boards.map((board) => ({
      id: board.id,
      title: board.title,
      created_date: formatDate(board.created_date),
    }));

    return response;
  }

  async createBoard(
    userId: number,
    boardCreatePayloadDto: BoardCreatePayloadDto,
  ): Promise<BoardCreateResponseDto> {
    const newBoard = this.boardRepository.create({
      title: boardCreatePayloadDto.title,
      user: { id: userId },
    });
    const savedBoard = await this.boardRepository.save(newBoard);

    const response: BoardCreateResponseDto = {
      title: savedBoard.title,
    };
    return response;
  }

  async getSingalBoard(
    boardId: number,
    userId: number,
  ): Promise<BoardSingleResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, user: { id: userId } },
    });

    if (!board) {
      throw new BadRequestException('Board not found');
    }

    const response: BoardSingleResponseDto = {
      title: board.title,
      show_likes: board.show_like,
      show_comments: board.show_comments,
      is_public: board.is_public,
      created_date: formatDate(board.created_date),
      updated_date: formatDate(board.updated_date),
    };

    return response;
  }

  async updateBoard(
    boardId: number,
    userId: number,
    boardUpdatePayloadDto: BoardUpdatePayloadDto,
  ): Promise<BoardSingleResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, user: { id: userId } },
    });

    if (!board) {
      throw new BadRequestException('Board not found');
    }

    board.title = boardUpdatePayloadDto.title;
    board.show_like = boardUpdatePayloadDto.show_likes;
    board.show_comments = boardUpdatePayloadDto.show_comments;
    board.is_public = boardUpdatePayloadDto.is_public;

    const updatedBoard = await this.boardRepository.save(board);

    const response: BoardSingleResponseDto = {
      title: updatedBoard.title,
      show_likes: updatedBoard.show_like,
      show_comments: updatedBoard.show_comments,
      is_public: updatedBoard.is_public,
      created_date: formatDate(updatedBoard.created_date),
      updated_date: formatDate(updatedBoard.updated_date),
    };

    return response;
  }

  async deleteBoard(boardId: number, userId: number): Promise<string> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, user: { id: userId } },
    });

    if (!board) {
      throw new BadRequestException('Board not found');
    }

    await this.boardRepository.remove(board);

    return 'Board deleted successfully';
  }
}

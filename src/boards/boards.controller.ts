import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BoardAllPayloadDto } from 'src/auth/dtos/req/board.all.payload.dto';
import { BoardCreatePayloadDto } from 'src/auth/dtos/req/board.create.payload.dto';
import { BoardUpdatePayloadDto } from 'src/auth/dtos/req/board.update.payload.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { BoardsService } from './boards.service';

@ApiBearerAuth()
@Controller('dashboard/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('search')
  @UseGuards(AuthGuard)
  async getAllBoards(@Body() boardAllPayloadDto: BoardAllPayloadDto, @Req() req) {
    return this.boardsService.getAllBoards(req.userId, boardAllPayloadDto);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createBoard(
    @Body() boardCreatePayloadDto: BoardCreatePayloadDto,
    @Req() req,
  ) {
    return this.boardsService.createBoard(req.userId, boardCreatePayloadDto);
  }

  @Get(':boardId')
  @UseGuards(AuthGuard)
  async getSingalBoard(@Param('boardId') boardId: number, @Req() req) {
    return this.boardsService.getSingalBoard(boardId, req.userId);
  }

  @Put(':boardId')
  @UseGuards(AuthGuard)
  async updateBoard(
    @Param('boardId') boardId: number,
    @Body() boardUpdatePayloadDto: BoardUpdatePayloadDto,
    @Req() req,
  ) {
    return this.boardsService.updateBoard(
      boardId,
      req.userId,
      boardUpdatePayloadDto,
    );
  }

  @Delete(':boardId')
  @UseGuards(AuthGuard)
  async deleteBoard(@Param('boardId') boardId: number, @Req() req) {
    return this.boardsService.deleteBoard(boardId, req.userId);
  }
}

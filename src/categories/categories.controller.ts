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
import { CategoryCreatePayloadDto } from 'src/auth/dtos/req/category.create.payload.dto';
import { CategoryUpdatePayloadDto } from 'src/auth/dtos/req/category.update.payload.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoriesService } from './categories.service';

@ApiBearerAuth()
@Controller('dashboard/boards/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('search/:boardId')
  @UseGuards(AuthGuard)
  async getAllBoards(@Param('boardId') boardId: number) {
    return this.categoriesService.getAllCategories(boardId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createCategory(
    @Body() categoryCreatePayloadDto: CategoryCreatePayloadDto,
    @Req() req,
  ) {
    return this.categoriesService.createCategory(
      req.userId,
      categoryCreatePayloadDto,
    );
  }

  @Get(':boardId/:categoryId')
  @UseGuards(AuthGuard)
  async getCategories(
    @Param('boardId') boardId: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.categoriesService.getCategoryByBoardId(boardId, categoryId);
  }

  @Put(':boardId/:categoryId')
  @UseGuards(AuthGuard)
  async updateCategory(
    @Param('boardId') boardId: number,
    @Param('categoryId') categoryId: number,
    @Body() categoryUpdatePayloadDto: CategoryUpdatePayloadDto,
  ) {
    return this.categoriesService.updateCategory(
      boardId,
      categoryId,
      categoryUpdatePayloadDto,
    );
  }

  @Delete(':boardId/:categoryId')
  @UseGuards(AuthGuard)
  async deleteCategory(
    @Param('boardId') boardId: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.categoriesService.deleteCategory(boardId, categoryId);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryCreatePayloadDto } from 'src/auth/dtos/req/category.create.payload.dto';
import { CategoryUpdatePayloadDto } from 'src/auth/dtos/req/category.update.payload.dto';
import { CategoryAllResponseDto } from 'src/auth/dtos/res/category.all.response.dto';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(
    boardId: number,
  ): Promise<CategoryAllResponseDto[] | null> {
    const categories = await this.categoryRepository.find({
      where: { board: { id: boardId } },
    });

    if (!categories) {
      return null;
    }

    const response: CategoryAllResponseDto[] = categories.map((category) => ({
      id: category.id,
      category_name: category.category_name,
    }));
    return response;
  }

  async createCategory(
    userId: number,
    categoryCreatePayloadDto: CategoryCreatePayloadDto,
  ): Promise<CategoryAllResponseDto> {
    const newCategory = this.categoryRepository.create({
      board: { id: categoryCreatePayloadDto.board_id },
      category_name: categoryCreatePayloadDto.category_name,
    });
    const savedCategory = await this.categoryRepository.save(newCategory);

    const response: CategoryAllResponseDto = {
      id: savedCategory.id,
      category_name: savedCategory.category_name,
    };
    return response;
  }

  async getCategoryByBoardId(
    boardId: number,
    categoryId: number,
  ): Promise<CategoryAllResponseDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, board: { id: boardId } },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const response: CategoryAllResponseDto = {
      id: category.id,
      category_name: category.category_name,
    };
    return response;
  }

  async updateCategory(
    boardId: number,
    categoryId: number,
    categoryUpdatePayloadDto: CategoryUpdatePayloadDto,
  ): Promise<CategoryAllResponseDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, board: { id: boardId } },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    category.category_name = categoryUpdatePayloadDto.category_name;
    const updatedCategory = await this.categoryRepository.save(category);

    const response: CategoryAllResponseDto = {
      id: updatedCategory.id,
      category_name: updatedCategory.category_name,
    };
    return response;
  }

  async deleteCategory(boardId: number, categoryId: number): Promise<string> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, board: { id: boardId } },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    await this.categoryRepository.delete(category.id);

    return 'Category deleted successfully';
  }
}

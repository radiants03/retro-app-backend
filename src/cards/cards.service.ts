import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardCreatePayloadDto } from 'src/auth/dtos/req/card.create.payload.dto';
import { CardUpdatePayloadDto } from 'src/auth/dtos/req/card.update.payload.dto';
import { CardAllResponseDto } from 'src/auth/dtos/res/card.all.response.dto';
import { StringResponseDto } from 'src/auth/dtos/res/string.response.dto';
import { CardEntity } from 'src/entities/card.entity';
import { formatDate } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async getAllCards(categoryId: number): Promise<CardAllResponseDto[]> {
    const cards = await this.cardRepository.find({
      where: { category: { id: categoryId } },
      order: { created_date: 'ASC' },
    });

    const response: CardAllResponseDto[] = cards.map((card) => {
      return {
        id: card.id,
        content: card.content,
        like_count: card.like_count,
        dislike_count: card.dislike_count,
        username: card.username,
        created_date: formatDate(card.created_date),
        updated_date: formatDate(card.updated_date),
      };
    });

    return response;
  }

  async getCardById(
    categoryId: number,
    cardId: number,
  ): Promise<CardAllResponseDto> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, category: { id: categoryId } },
    });

    if (!card) {
      throw new BadRequestException('Card not found');
    }

    const response: CardAllResponseDto = {
      id: card.id,
      content: card.content,
      like_count: card.like_count,
      dislike_count: card.dislike_count,
      username: card.username,
      created_date: formatDate(card.created_date),
      updated_date: formatDate(card.updated_date),
    };

    return response;
  }

  async createCard(
    cardCreatePayloadDto: CardCreatePayloadDto,
  ): Promise<CardAllResponseDto> {
    const card = this.cardRepository.create({
      content: cardCreatePayloadDto.content,
      username: cardCreatePayloadDto.username,
      category: { id: cardCreatePayloadDto.category_id },
    });
    const savedCard = await this.cardRepository.save(card);

    const response: CardAllResponseDto = {
      id: savedCard.id,
      content: savedCard.content,
      like_count: savedCard.like_count,
      dislike_count: savedCard.dislike_count,
      username: savedCard.username,
      created_date: formatDate(savedCard.created_date),
      updated_date: formatDate(savedCard.updated_date),
    };

    return response;
  }

  async updateCard(
    categoryId: number,
    cardId: number,
    cardUpdatePayloadDto: CardUpdatePayloadDto,
  ): Promise<CardAllResponseDto> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, category: { id: categoryId } },
    });

    if (!card) {
      throw new BadRequestException('Card not found');
    }

    card.content = cardUpdatePayloadDto.content;

    const updatedCard = await this.cardRepository.save(card);

    const response: CardAllResponseDto = {
      id: updatedCard.id,
      content: updatedCard.content,
      like_count: updatedCard.like_count,
      dislike_count: updatedCard.dislike_count,
      username: updatedCard.username,
      created_date: formatDate(updatedCard.created_date),
      updated_date: formatDate(updatedCard.updated_date),
    };

    return response;
  }

  async deleteCard(
    categoryId: number,
    cardId: number,
  ): Promise<StringResponseDto> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, category: { id: categoryId } },
    });

    if (!card) {
      throw new BadRequestException('Card not found');
    }

    await this.cardRepository.remove(card);

    return { message: 'Card deleted successfully' };
  }

  async likeCard(
    categoryId: number,
    cardId: number,
  ): Promise<CardAllResponseDto> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, category: { id: categoryId } },
    });

    if (!card) {
      throw new BadRequestException('Card not found');
    }

    card.like_count += 1;

    const updatedCard = await this.cardRepository.save(card);

    const response: CardAllResponseDto = {
      id: updatedCard.id,
      content: updatedCard.content,
      like_count: updatedCard.like_count,
      dislike_count: updatedCard.dislike_count,
      username: updatedCard.username,
      created_date: formatDate(updatedCard.created_date),
      updated_date: formatDate(updatedCard.updated_date),
    };

    return response;
  }

  async dislikeCard(
    categoryId: number,
    cardId: number,
  ): Promise<CardAllResponseDto> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, category: { id: categoryId } },
    });

    if (!card) {
      throw new BadRequestException('Card not found');
    }

    card.dislike_count += 1;

    const updatedCard = await this.cardRepository.save(card);

    const response: CardAllResponseDto = {
      id: updatedCard.id,
      content: updatedCard.content,
      like_count: updatedCard.like_count,
      dislike_count: updatedCard.dislike_count,
      username: updatedCard.username,
      created_date: formatDate(updatedCard.created_date),
      updated_date: formatDate(updatedCard.updated_date),
    };

    return response;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CardCreatePayloadDto } from 'src/auth/dtos/req/card.create.payload.dto';
import { CardUpdatePayloadDto } from 'src/auth/dtos/req/card.update.payload.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CardsService } from './cards.service';

@ApiBearerAuth()
@Controller('dashboard/boards/categories/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('search/:categoryId')
  @UseGuards(AuthGuard)
  async getAllCards(@Param('categoryId') categoryId: number) {
    return this.cardsService.getAllCards(categoryId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createCard(@Body() cardCreatePayloadDto: CardCreatePayloadDto) {
    return this.cardsService.createCard(cardCreatePayloadDto);
  }

  @Get(':categoryId/:cardId')
  @UseGuards(AuthGuard)
  async getCardById(
    @Param('categoryId') categoryId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardsService.getCardById(categoryId, cardId);
  }

  @Put(':categoryId/:cardId')
  @UseGuards(AuthGuard)
  async updateCard(
    @Param('categoryId') categoryId: number,
    @Param('cardId') cardId: number,
    @Body() cardUpdatePayloadDto: CardUpdatePayloadDto,
  ) {
    return this.cardsService.updateCard(
      categoryId,
      cardId,
      cardUpdatePayloadDto,
    );
  }

  @Delete(':categoryId/:cardId')
  @UseGuards(AuthGuard)
  async deleteCard(
    @Param('categoryId') categoryId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardsService.deleteCard(categoryId, cardId);
  }

  @Post('like/:categoryId/:cardId')
  @UseGuards(AuthGuard)
  async likeCard(
    @Param('categoryId') categoryId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardsService.likeCard(categoryId, cardId);
  }

  @Post('dislike/:categoryId/:cardId')
  @UseGuards(AuthGuard)
  async dislikeCard(
    @Param('categoryId') categoryId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardsService.dislikeCard(categoryId, cardId);
  }
}

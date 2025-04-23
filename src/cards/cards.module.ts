import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/entities/card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

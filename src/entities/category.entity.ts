import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';
import { CardEntity } from './card.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  category_name: string;

  @ManyToOne(() => BoardEntity, (board) => board.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;

  @OneToMany(() => CardEntity, (card) => card.category, { cascade: true })
  cards: CardEntity[];
}

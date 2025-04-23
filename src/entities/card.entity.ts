import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CommentEntity } from './comment.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  content: string;

  @Column({ type: 'int', nullable: true })
  like_count: number;

  @Column({ type: 'int', nullable: true })
  dislike_count: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_date: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card, { cascade: true })
  comments: Comment[];
}

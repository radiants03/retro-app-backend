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
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'boolean', default: true })
  show_name: boolean;

  @Column({ type: 'boolean', default: true })
  show_like: boolean;

  @Column({ type: 'boolean', default: true })
  show_comments: boolean;

  @Column({ type: 'boolean', default: true })
  is_public: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CategoryEntity, (category) => category.board, {
    cascade: true,
  })
  categories: CategoryEntity[];
}

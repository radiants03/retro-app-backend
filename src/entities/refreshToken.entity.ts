import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refreshtoken')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  token: string;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @Column({ type: 'timestamp' })
  expiryDate: Date;
}

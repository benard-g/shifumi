import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GameRoom } from '../../core/types/GameRoom';

@Entity('game_rooms')
export class GameRoomEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'jsonb' })
  cache!: GameRoom;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt!: Date;
}

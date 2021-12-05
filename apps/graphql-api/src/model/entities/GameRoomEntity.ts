import { Entity, PrimaryColumn } from 'typeorm';

@Entity('game_rooms')
export class GameRoomEntity {
  @PrimaryColumn()
  id!: string;
}

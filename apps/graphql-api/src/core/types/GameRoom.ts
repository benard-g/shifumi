import { ShiFuMi } from './ShiFuMi';

export interface GameRoomPlayer {
  id: string;
  name: string;
  action?: ShiFuMi;
}

export interface GameRoom {
  id: string;
  players: GameRoomPlayer[];
}

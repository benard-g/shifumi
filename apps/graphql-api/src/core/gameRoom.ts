import { v4 as uuid } from 'uuid';

import { GameRoom, GameRoomPlayer } from './types/GameRoom';

interface CreateGameRoom {
  creatingPlayer: Pick<GameRoomPlayer, 'id' | 'name'>;
}

export function createGameRoom(options: CreateGameRoom): GameRoom {
  const { creatingPlayer } = options;
  const { id, name } = creatingPlayer;

  return {
    id: uuid(),
    players: [{ id, name }],
  };
}

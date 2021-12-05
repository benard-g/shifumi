import { GameRoom_mutation_createGameRoom_Resolver } from './mutation/createGameRoom';
import { GameRoom_query_gameRoom_Resolver } from './query/gameRoom';

export const GameRoomResolvers = [
  GameRoom_mutation_createGameRoom_Resolver,
  GameRoom_query_gameRoom_Resolver,
] as const;

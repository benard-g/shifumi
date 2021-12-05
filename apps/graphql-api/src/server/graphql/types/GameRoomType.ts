import { Field, ID, ObjectType } from 'type-graphql';

import { GameRoomPlayerType } from './GameRoomPlayerType';

@ObjectType('GameRoom')
export class GameRoomType {
  @Field(() => ID)
  id!: string;

  @Field(() => [GameRoomPlayerType])
  players!: GameRoomPlayerType[];
}

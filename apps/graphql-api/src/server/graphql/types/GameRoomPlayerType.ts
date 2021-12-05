import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('GameRoomPlayer')
export class GameRoomPlayerType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

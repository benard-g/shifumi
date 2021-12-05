import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';

import { Context } from '../../../Context';
import { GameRoomType } from '../../../types/GameRoomType';

@InputType()
class CreateGameRoomInput {
  @Field()
  playerName!: string;
}

@Resolver()
export class GameRoom_mutation_createGameRoom_Resolver {
  @Mutation(() => GameRoomType)
  async createGameRoom(
    @Arg('input') input: CreateGameRoomInput,
    @Ctx() context: Context,
  ): Promise<GameRoomType> {
    const { playerName } = input;
    const { userId } = context;

    // TODO save in DB
    return {
      id: 'some-new-lobby-id',
      players: [
        {
          id: userId,
          name: playerName,
        },
      ],
    };
  }
}

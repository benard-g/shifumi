import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Connection } from 'typeorm';

import { createGameRoom } from '../../../../../core/gameRoom';
import { GameRoomEntity } from '../../../../../model/entities/GameRoomEntity';
import { Service } from '../../../../../utils/ServiceLocator';
import { Context } from '../../../Context';
import { GameRoomType } from '../../../types/GameRoomType';

@InputType()
class CreateGameRoomInput {
  @Field()
  playerName!: string;
}

@Service()
@Resolver()
export class GameRoom_mutation_createGameRoom_Resolver {
  constructor(private readonly conn: Connection) {}

  @Mutation(() => GameRoomType)
  async createGameRoom(
    @Arg('input') input: CreateGameRoomInput,
    @Ctx() context: Context,
  ): Promise<GameRoomType> {
    const { playerName } = input;
    const { userId } = context;

    const gameRoom = createGameRoom({
      creatingPlayer: {
        id: userId,
        name: playerName,
      },
    });

    await this.conn.getRepository(GameRoomEntity).insert({
      id: gameRoom.id,
      cache: gameRoom,
    });

    return gameRoom;
  }
}

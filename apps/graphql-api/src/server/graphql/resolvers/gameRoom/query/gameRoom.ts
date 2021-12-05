import { Args, ArgsType, Field, ID, Query, Resolver } from 'type-graphql';
import { Connection } from 'typeorm';

import { GameRoomEntity } from '../../../../../model/entities/GameRoomEntity';
import { Service } from '../../../../../utils/ServiceLocator';
import { GameRoomType } from '../../../types/GameRoomType';

@ArgsType()
class GameRoomArgs {
  @Field(() => ID)
  id!: string;
}

@Service()
@Resolver()
export class GameRoom_query_gameRoom_Resolver {
  constructor(private readonly conn: Connection) {}

  @Query(() => GameRoomType, { nullable: true })
  async gameRoom(@Args() args: GameRoomArgs): Promise<GameRoomType | null> {
    const { id } = args;

    const gameRoom = await this.conn
      .getRepository(GameRoomEntity)
      .findOne(id, {});
    if (!gameRoom) {
      return null;
    }

    return gameRoom.cache;
  }
}

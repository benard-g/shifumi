import { createConnection } from 'typeorm';

import { GameRoomEntity } from './entities/GameRoomEntity';

const ENTITIES = [GameRoomEntity];

interface Options {
  databaseUrl: string;
}

export async function createDatabaseConnection(options: Options) {
  const { databaseUrl } = options;

  return createConnection({
    type: 'postgres',
    entities: ENTITIES,
    logging: false,
    synchronize: false,
    url: databaseUrl,
  });
}

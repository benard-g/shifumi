import * as TypeGraphql from 'type-graphql';

import { GameRoomResolvers } from './resolvers/gameRoom';
import { QueryResolvers } from './resolvers/query';

const RESOLVERS = [...GameRoomResolvers, ...QueryResolvers] as const;

interface Options {
  emitSchemaFile: string | false;
}

export function buildSchema(options: Options) {
  const { emitSchemaFile } = options;

  return TypeGraphql.buildSchema({
    container: ({ context }) => context.serviceLocator,
    emitSchemaFile,
    resolvers: RESOLVERS,
  });
}

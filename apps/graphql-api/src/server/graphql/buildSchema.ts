import * as TypeGraphql from 'type-graphql';

import { GameRoomResolvers } from './resolvers/gameRoom';
import { ViewerResolvers } from './resolvers/viewer';

const RESOLVERS = [...GameRoomResolvers, ...ViewerResolvers] as const;

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

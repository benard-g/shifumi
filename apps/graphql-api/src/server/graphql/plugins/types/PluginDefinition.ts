import type { Config as ApolloConfig } from 'apollo-server-fastify';

// We need this hack to get PluginDefinition from `apollo-server-fastify`
// because its typing is not exported.
export type PluginDefinition = NonNullable<ApolloConfig['plugins']>[0];

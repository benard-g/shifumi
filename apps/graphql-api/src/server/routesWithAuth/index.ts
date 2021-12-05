import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { getSelfUser } from './users/me';

export function createRoutesWithAuthPlugin() {
  return (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    getSelfUser(fastify, '/users/me');

    done();
  };
}

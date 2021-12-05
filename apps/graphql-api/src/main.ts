import 'reflect-metadata';
import 'source-map-support/register';

import { AuthService } from './services/auth';
import { Jwt } from './utils/Jwt';
import { Logger } from './utils/Logger';
import { ServiceLocator } from './utils/ServiceLocator';
import { Config, loadConfig } from './config';
import { createServer } from './server';

export async function main(config: Config, serviceLocator: ServiceLocator) {
  const logger = serviceLocator.get(Logger);

  // Init utilities
  const jwtUtil = new Jwt(config.JWT_SECRET_KEY);

  // Init services
  logger.info('[app] Services initializing...');
  const authService = new AuthService(
    { accessTokenDurationInSeconds: config.ACCESS_TOKEN_DURATION },
    jwtUtil,
  );
  serviceLocator.set(AuthService, authService);
  logger.info('[app] Services initialized');

  // Init server
  logger.info('[app] Server starting...');
  const server = await createServer({
    serviceLocator,
    emitSchemaFile: config.GRAPHQL_SCHEMA_GENERATION_PATH,
  });
  await server.listen(config.PORT);
  logger.info('[app] Server started', { port: config.PORT });
}

if (require.main === module) {
  const config = loadConfig();

  const logger = Logger.createNew({
    enabled: config.NODE_ENV !== 'test',
    minLevel: config.LOG_LEVEL,
    prettyPrint: config.NODE_ENV === 'development',
  });

  const serviceLocator = ServiceLocator.createNew();
  serviceLocator.set(Logger, logger);

  main(config, serviceLocator).catch((err) => {
    console.error('[app] An error occurred during startup', { err });
    process.exit(1);
  });
}

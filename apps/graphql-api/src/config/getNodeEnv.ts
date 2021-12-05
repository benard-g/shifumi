import { getFromEnv } from './utils/env';
import { NodeEnv } from './utils/types';

export function getNodeEnv(): NodeEnv {
  const nodeEnv = getFromEnv('NODE_ENV', null);

  switch (nodeEnv) {
    case 'production':
      return 'production';
    case 'test':
      return 'test';
    default:
      return 'development';
  }
}

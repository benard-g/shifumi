import { v4 as uuid } from 'uuid';

import { User } from './types/User';

export function createUser(): User {
  return {
    id: uuid(),
  };
}

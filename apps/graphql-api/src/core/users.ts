import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
}

export function createUser(): User {
  return {
    id: uuid(),
  };
}

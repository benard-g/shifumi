import { useGameRoomQuery as codegenQuery } from './query.codegen';

export function useGameRoomQuery() {
  const { data, error, loading } = codegenQuery();

  return {
    error,
    gameRoom: data ? { name: 'toto' } : undefined,
    loading,
  };
}

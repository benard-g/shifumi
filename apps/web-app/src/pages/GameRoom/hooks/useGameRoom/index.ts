import { useGameRoomQuery } from './query.codegen';

export function useGameRoom(gameRoomId: string) {
  const { data, error, loading } = useGameRoomQuery({
    variables: { gameRoomId },
  });

  return {
    error,
    gameRoom: data ? data.gameRoom : undefined,
    loading,
  };
}

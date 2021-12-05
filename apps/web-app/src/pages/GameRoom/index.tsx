import { useGameRoomQuery } from './hooks/useGameRoomQuery';

function GameRoom() {
  const { error, gameRoom, loading } = useGameRoomQuery();

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error || !gameRoom) {
    return (
      <div>
        <p>An error occurred</p>
        <code>{error?.stack}</code>
      </div>
    );
  }

  return (
    <div>
      <h1>Shifumi - GameRoom</h1>

      <p>
        The name of the room is:
        {gameRoom.name}
      </p>
    </div>
  );
}

export default GameRoom;

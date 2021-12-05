import { useParams } from 'react-router-dom';

import { useGameRoom } from './hooks/useGameRoom';

interface RouteParams {
  id: string;
}

function GameRoom() {
  const { id } = useParams() as RouteParams;

  const { error, gameRoom, loading } = useGameRoom(id);

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
        The id of the room is:
        {gameRoom.id}
      </p>

      <div>
        <p>The players are:</p>
        <ul>
          {gameRoom.players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameRoom;

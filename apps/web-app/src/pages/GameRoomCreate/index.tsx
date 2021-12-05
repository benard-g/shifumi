import { useNavigate } from 'react-router-dom';

import * as routes from '../../app/routes';

import { useCreateGameRoom } from './hooks/useCreateGameRoom';

function GameRoomCreatePage() {
  const navigate = useNavigate();

  const [createGameRoom, { loading, error }] = useCreateGameRoom();

  const onClick = async () => {
    try {
      const { data } = await createGameRoom({
        variables: { input: { playerName: 'Billy' } },
      });

      if (data) {
        const { createGameRoom } = data;
        navigate(routes.GAME_ROOM_ID.replace(':id', createGameRoom.id));
      }
    } catch (_err) {
      // Error handled by the view
    }
  };

  return (
    <div>
      <h1>GameRoom</h1>

      <button disabled={loading} onClick={onClick}>
        Create new
      </button>

      {error ? <code>{error.stack}</code> : null}
    </div>
  );
}

export default GameRoomCreatePage;

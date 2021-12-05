import { Link } from 'react-router-dom';

import * as routes from '../../app/routes';

function HomePage() {
  return (
    <div>
      <h1>Shifumi - Home</h1>

      <Link to={routes.GAME_ROOM}>GAME ROOM</Link>
    </div>
  );
}

export default HomePage;

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import {
  AuthenticationProvider,
  useAuthentication,
} from '../hooks/authentication';
import GameRoomPage from '../pages/GameRoom';
import GameRoomCreatePage from '../pages/GameRoomCreate';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import GraphqlProvider from '../services/graphql/GraphqlProvider';

import * as routes from './routes';
import { getLoginRedirectPath } from './utils';

function App() {
  const location = useLocation();
  const [{ isAuthenticated }] = useAuthentication();

  return (
    <Routes>
      <Route element={<HomePage />} path={routes.HOME} />
      <Route element={<LoginPage />} path={routes.LOGIN} />

      {isAuthenticated ? (
        <>
          <Route
            element={<GameRoomCreatePage />}
            path={routes.GAME_ROOM_CREATE}
          />
          <Route element={<GameRoomPage />} path={routes.GAME_ROOM_ID} />
        </>
      ) : (
        <Route
          element={<Navigate replace to={getLoginRedirectPath(location)} />}
          path="*"
        />
      )}
    </Routes>
  );
}

function AppContainer() {
  return (
    <Router>
      <AuthenticationProvider>
        <GraphqlProvider>
          <App />
        </GraphqlProvider>
      </AuthenticationProvider>
    </Router>
  );
}

export default AppContainer;

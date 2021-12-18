import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import AppLayout from '../components/AppLayout';
import {
  AuthenticationProvider,
  useAuthentication,
} from '../hooks/authentication';
import { UserProfileProvider } from '../hooks/userProfile';
import GameRoomPage from '../pages/GameRoom';
import GameRoomCreatePage from '../pages/GameRoomCreate';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import GraphqlProvider from '../services/graphql/GraphqlProvider';

import routes from './routes';
import { getLoginRedirectPath } from './utils';

function App() {
  const location = useLocation();
  const [{ isAuthenticated }] = useAuthentication();

  return (
    <AppLayout>
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
    </AppLayout>
  );
}

function AppContainer() {
  return (
    <ChakraProvider>
      <Router>
        <AuthenticationProvider>
          <UserProfileProvider>
            <GraphqlProvider>
              <App />
            </GraphqlProvider>
          </UserProfileProvider>
        </AuthenticationProvider>
      </Router>
    </ChakraProvider>
  );
}

export default AppContainer;

import { ApolloProvider } from '@apollo/client';
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
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import { createGraphqlClient } from '../services/graphql/createGraphqlClient';

import * as routes from './routes';
import { getLoginRedirectPath } from './utils';

function AppAuthenticatedContainer() {
  const [authState] = useAuthentication();

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <ApolloProvider client={createGraphqlClient(authState.accessToken)}>
      <Routes>
        <Route element={<GameRoomPage />} path={routes.GAME_ROOM} />
      </Routes>
    </ApolloProvider>
  );
}

function App() {
  const location = useLocation();
  const [{ isAuthenticated }] = useAuthentication();

  return (
    <Routes>
      <Route element={<HomePage />} path={routes.HOME} />
      <Route element={<LoginPage />} path={routes.LOGIN} />

      {isAuthenticated ? (
        <Route path="*" element={<AppAuthenticatedContainer />} />
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
        <App />
      </AuthenticationProvider>
    </Router>
  );
}

export default AppContainer;

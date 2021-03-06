import jwtDecode from 'jwt-decode';
import * as React from 'react';

import { authenticate as authenticateRequest } from '../services/auth/authenticate';

//
// LocalStorage helpers
//
const LOCAL_STORAGE_KEY = 'shifumi@access-token';

function getTokenFromStorage() {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!token) {
    return undefined;
  }

  try {
    const { exp } = jwtDecode<{ exp?: unknown }>(token);
    if (!exp || typeof exp !== 'number' || exp * 1000 <= Date.now()) {
      return undefined;
    }
    return token;
  } catch (_) {
    return undefined;
  }
}

function saveTokenInStorage(token: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
}

//
// Context
//
type AuthContext = {
  accessToken: string | undefined;
  authenticate: () => void;
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AUTH_CONTEXT = React.createContext<AuthContext | undefined>(undefined);

//
// Provider
//
type ProviderProps = React.PropsWithChildren<unknown>;

export function AuthenticationProvider(props: ProviderProps) {
  const { children } = props;

  const [authState, setAuthState] = React.useState<
    Omit<AuthContext, 'authenticate'>
  >(() => {
    const token = getTokenFromStorage();
    return {
      accessToken: token,
      error: undefined,
      isAuthenticated: !!token,
      isLoading: false,
    };
  });

  const authenticate = React.useCallback(() => {
    setAuthState({
      accessToken: undefined,
      error: undefined,
      isAuthenticated: false,
      isLoading: true,
    });

    authenticateRequest()
      .then((response) => {
        if (response.ok) {
          const { accessToken } = response;
          saveTokenInStorage(accessToken);
          setAuthState({
            accessToken,
            error: undefined,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            accessToken: undefined,
            error: response.error,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        setAuthState({
          accessToken: undefined,
          error,
          isAuthenticated: false,
          isLoading: false,
        });
      });
  }, []);

  const { accessToken, error, isAuthenticated, isLoading } = authState;

  return (
    <AUTH_CONTEXT.Provider
      value={{
        accessToken,
        authenticate,
        error,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AUTH_CONTEXT.Provider>
  );
}

//
// Hook
//
export function useAuthentication() {
  const context = React.useContext(AUTH_CONTEXT);
  if (!context) {
    throw new Error(
      '"useAuthentication" can only be used under "AuthenticationProvider"',
    );
  }

  const {
    accessToken,
    authenticate: authenticateCb,
    error,
    isAuthenticated,
    isLoading,
  } = context;
  const stateInfo = { authenticate: authenticateCb, error, loading: isLoading };

  if (isAuthenticated && accessToken) {
    return [{ isAuthenticated: true, accessToken }, stateInfo] as const;
  }

  return [{ isAuthenticated: false }, stateInfo] as const;
}

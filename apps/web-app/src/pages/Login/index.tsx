import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthentication } from '../../hooks/authentication';

function LoginPage() {
  const { search } = useLocation();
  const [{ isAuthenticated }, { authenticate, error, loading }] =
    useAuthentication();

  React.useEffect(() => {
    if (!isAuthenticated && !error) {
      authenticate();
    }
  }, [authenticate, error, isAuthenticated]);

  if (loading) {
    return <div>Login in progress...</div>;
  }

  if (error) {
    return (
      <div style={{ width: '1000px' }}>
        <p>Error during authentication</p>
        <code>{error.stack}</code>
      </div>
    );
  }

  if (isAuthenticated) {
    const params = new URLSearchParams(search);
    const redirectPath = params.get('path');
    const redirectSearch = params.get('search');
    const redirectHash = params.get('hash');
    const redirectUrl =
      redirectPath + (redirectSearch || '') + (redirectHash || '');

    return <Navigate replace to={redirectUrl} />;
  }

  return (
    <div>
      <h1>Shifumi - Login</h1>
    </div>
  );
}

export default LoginPage;

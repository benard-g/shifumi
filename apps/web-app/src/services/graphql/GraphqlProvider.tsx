import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as React from 'react';

import { CONFIG } from '../../config';
import { useAuthentication } from '../../hooks/authentication';

import introspection from './possibleTypes.codegen';
import { typePolicies } from './typePolicies';

const GRAPHQL_URL = `${CONFIG.API_URL}/graphql`;
const IS_DEV_MODE = CONFIG.NODE_ENV === 'development';

function createGraphqlClient(accessToken: string) {
  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: introspection.possibleTypes,
      typePolicies,
    }),
    connectToDevTools: IS_DEV_MODE,
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function GraphqlProvider(props: React.PropsWithChildren<unknown>) {
  const { children } = props;

  const [authState] = useAuthentication();
  if (!authState.isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={createGraphqlClient(authState.accessToken)}>
      {children}
    </ApolloProvider>
  );
}

export default GraphqlProvider;

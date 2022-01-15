import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { OperationDefinitionNode, OperationTypeNode } from 'graphql';
import toast from 'react-hot-toast';

const httpLink = new HttpLink({
  uri: 'https://my-utang-backend.herokuapp.com/',
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const isQuery = operation.query.definitions.some(
    d => (d as OperationDefinitionNode).operation === OperationTypeNode.QUERY
  );

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (isQuery) toast.error(message);
      return console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });

  if (networkError) {
    toast.error(networkError.message);
    console.error(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  if (!token) document.cookie = '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

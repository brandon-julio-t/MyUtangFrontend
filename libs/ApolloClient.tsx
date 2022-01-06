import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.graphqlplaceholder.com/',
  cache: new InMemoryCache(),
});

export default client;

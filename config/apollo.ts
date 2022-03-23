// lib
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const API_CLIENT = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_DB_URL,
  headers: {
    apiKey: process.env.NEXT_PUBLIC_DB_API_KEY!,
  },
  cache: new InMemoryCache(),
});

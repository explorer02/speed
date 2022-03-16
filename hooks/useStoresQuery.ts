// lib
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';

// queries
import { FETCH_ALL_STORES } from 'queries/store';

// types
import { Store } from 'types/store';

type UseStoresQuery = () => {
  data?: Store[];
  loading: boolean;
  error?: ApolloError;
};

export const useStoresQuery: UseStoresQuery = () => {
  const { data, loading, error } = useQuery<{ stores: Store[] }>(FETCH_ALL_STORES, {});
  return { data: data?.stores, loading, error };
};

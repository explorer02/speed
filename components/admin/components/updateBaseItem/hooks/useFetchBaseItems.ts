// lib
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

// hooks

// graphql

// helpers

// constants

// types
import { BaseItem } from 'types/store';

const QUERY = gql`
  query BaseItems {
    items {
      _id
      description
      label
      unit
    }
  }
`;

type TData = { items: BaseItem[] };

type UseFetchBaseItems = (params?: { options?: QueryHookOptions<TData> }) => Omit<
  QueryResult<TData>,
  'data'
> & {
  data?: BaseItem[];
};

export const useFetchBaseItems: UseFetchBaseItems = (params) => {
  const { data, ...queryResult } = useQuery<TData>(QUERY, {
    ...params?.options,
  });

  return { data: data?.items, ...queryResult };
};

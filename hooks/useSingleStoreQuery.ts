// lib
import { QueryResult, useQuery } from '@apollo/react-hooks';

// queries
import { FETCH_STORE_WITH_ITEMS } from 'queries/store';

// types

import { Store } from 'types/store';

type StoreWithItems = Store & { items: Required<Store['items']> };

type UseSingleStoreQuery = (params: { _id: string }) => Omit<
  QueryResult<{ store: StoreWithItems }, { query: { _id: string } }>,
  'data'
> & {
  data?: StoreWithItems;
};

export const useSingleStoresQuery: UseSingleStoreQuery = ({ _id }) => {
  const { data, ...rest } = useQuery<{ store: StoreWithItems }, { query: { _id: string } }>(
    FETCH_STORE_WITH_ITEMS,
    {
      variables: {
        query: {
          _id,
        },
      },
    },
  );
  return { data: data?.store, ...rest };
};

// lib
import { QueryResult, useQuery } from '@apollo/client';
import { useMemo } from 'react';

// queries
import { FETCH_STORE_WITH_ITEMS } from 'queries/store';

// helpers
import { adaptItemsWithId } from 'helper/adapter';

// types
import { Item, Store } from 'types/store';

type StoreWithItems = Store & { items: Item[] };

type UseSingleStoreQuery = (params: { _id: string }) => Omit<
  QueryResult<{ store: StoreWithItems }, { query: { _id: string } }>,
  'data'
> & {
  data?: StoreWithItems;
};

export const useStoreQueryWithItems: UseSingleStoreQuery = ({ _id }) => {
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
  const adaptedData = useMemo(
    () =>
      data
        ? {
            ...data.store,
            items: adaptItemsWithId(data.store.items),
          }
        : data,
    [data],
  );
  return { data: adaptedData, ...rest };
};

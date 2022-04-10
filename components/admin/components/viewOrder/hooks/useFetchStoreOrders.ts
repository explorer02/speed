// lib
import { useMemo } from 'react';
import { LazyQueryResult, QueryHookOptions, QueryLazyOptions, useLazyQuery } from '@apollo/client';

// helpers
import { adaptOrderFromGraphQL } from 'helper/adapter';

// queries
import { FETCH_ORDER_OF_STORE } from 'queries/order';

// types
import { Order } from 'types/order';

type TData = { orders: Order[] };
type TVariable = {
  query: { status_in: string[]; createdOn_gte: Date; createdOn_lte: Date; store: { _id: string } };
};

type UseFetchStoreOrders = (options?: Pick<QueryHookOptions<TData, TVariable>, 'skip'>) => [
  (
    _options?: QueryLazyOptions<TVariable> | undefined,
  ) => Promise<LazyQueryResult<TData, TVariable>>,
  Omit<LazyQueryResult<TData, TVariable>, 'data'> & {
    data?: Order[];
  },
];

export const useFetchStoreOrders: UseFetchStoreOrders = () => {
  const [queryFn, { data, ...queryResult }] = useLazyQuery<TData, TVariable>(FETCH_ORDER_OF_STORE);

  const adaptedData = useMemo(
    () => (data?.orders ? adaptOrderFromGraphQL(data?.orders) : undefined),
    [data?.orders],
  );

  return [queryFn, { data: adaptedData, ...queryResult }];
};

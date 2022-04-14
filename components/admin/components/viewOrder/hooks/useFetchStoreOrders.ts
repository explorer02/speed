// lib
import { useCallback, useMemo } from 'react';
import { QueryResult, useQuery } from '@apollo/client';

// helpers
import { adaptOrderFromGraphQL } from 'helper/adapter';

// queries
import { FETCH_ORDER_OF_STORE } from 'queries/order';

// types
import { Order } from 'types/order';
import { ActionState } from '../types';

type TData = { orders: Order[] };
type TVariable = {
  query: { status_in: string[]; createdOn_gte: Date; createdOn_lte: Date; store: { _id: string } };
};

type UseFetchStoreOrders = (initialState: ActionState) => Omit<
  QueryResult<TData, TVariable>,
  'data' | 'refetch'
> & {
  data: Order[] | undefined;
  fetchOrder: (state: ActionState) => void;
};

const getVariables = (state: ActionState): TVariable => ({
  query: {
    createdOn_gte: new Date(state.startTime),
    createdOn_lte: new Date(state.endTime),
    status_in: state.statuses,
    store: {
      _id: state.selectedStore._id,
    },
  },
});

export const useFetchStoreOrders: UseFetchStoreOrders = (initialState) => {
  const initialVariables: TVariable = useMemo(() => getVariables(initialState), [initialState]);

  const { data, refetch, ...queryResult } = useQuery<TData, TVariable>(FETCH_ORDER_OF_STORE, {
    variables: initialVariables,
  });

  const adaptedData = useMemo(
    () => (data?.orders ? adaptOrderFromGraphQL(data?.orders) : undefined),
    [data?.orders],
  );

  const fetchOrder = useCallback(
    (state: ActionState) => {
      const variables = getVariables(state);
      refetch(variables);
    },
    [refetch],
  );

  return { data: adaptedData, fetchOrder, ...queryResult };
};

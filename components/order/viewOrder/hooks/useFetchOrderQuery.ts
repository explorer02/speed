// lib
import { useMemo } from 'react';
import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// helpers
import { adaptOrderFromGraphQL } from 'helper/adapter';

// queries
import { FETCH_USER_ORDERS_QUERY } from 'queries/user';

// types
import { Order } from 'types/order';

type TData = { user: { orders: Order[] } };
type TVariable = { query: { phone: string } };

type UseFetchOrderQuery = (
  options?: Pick<QueryHookOptions<TData, TVariable>, 'skip'>,
) => Omit<QueryResult, 'data'> & { data?: Order[] };

export const useFetchOrderQuery: UseFetchOrderQuery = (options) => {
  const { user, isLoggedIn } = useLoginInfo();

  const { data, ...queryResult } = useQuery<TData, TVariable>(FETCH_USER_ORDERS_QUERY, {
    variables: { query: { phone: user?.phoneNumber.substring(3) ?? '' } },
    skip: !isLoggedIn || !user || options?.skip,
  });

  const adaptedData = useMemo(
    () => (data?.user.orders ? adaptOrderFromGraphQL(data?.user.orders) : undefined),
    [data?.user.orders],
  );
  return { data: adaptedData, ...queryResult };
};

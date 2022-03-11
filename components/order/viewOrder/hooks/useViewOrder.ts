// lib
import * as React from 'react';
import _orderBy from 'lodash/orderBy';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// helpers
import { getOrderCollectionRef } from 'helper/docReference';

// constants
import { ORDER_COLLECTION } from 'constants/collections';
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Order } from 'types/order';
import { OnAction } from './types';
import { ACTION_TYPES } from './constants';
import { useRouter } from 'next/router';

type UseViewOrder = () => {
  data: Order[];
  isLoading: boolean;
  onAction: OnAction;
};

const getQueryParamsFromOrder = (order: Order): { store: string; items: string } => {
  const selectedStoreId = order.storeId;
  const selectedItemsId = [...order.items.map((item) => item.id)].join();
  const queryParams = {
    store: selectedStoreId,
    items: selectedItemsId,
    tabId: 0,
  };
  return queryParams;
};

export const useViewOrder: UseViewOrder = () => {
  const { user } = useLoginInfo();
  const phone = user?.phoneNumber;

  const query = React.useMemo(() => getOrderCollectionRef(phone!), [phone]);
  const { data: orders = EMPTY_ARRAY as Order[], isLoading } = useFirestoreQueryData<Order>(
    [ORDER_COLLECTION, phone],
    query,
    {
      subscribe: true,
    },
  );

  const { push, pathname } = useRouter();

  const onAction: OnAction = React.useCallback(
    (action) => {
      const { type, payload } = action;
      switch (type) {
        case ACTION_TYPES.CANCEL_ORDER:
          break;
        case ACTION_TYPES.VIEW_RECEIPT:
          break;
        case ACTION_TYPES.REPEAT_ORDER:
          const queryParams = getQueryParamsFromOrder(payload.order);
          console.log(pathname, queryParams);
          push(pathname, { query: queryParams });
          break;
        default:
          break;
      }
    },
    [push, pathname],
  );

  const adaptedData = React.useMemo(() => _orderBy(orders, 'createdOn', 'desc'), [orders]);
  console.log(adaptedData);
  return {
    data: adaptedData,
    isLoading,
    onAction,
  };
};

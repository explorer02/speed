// lib
import * as React from 'react';
import _orderBy from 'lodash/orderBy';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';
import { useRouter } from 'next/router';

// helpers
import { getOrderCollectionRef } from 'helper/docReference';
import { cancelOrder } from './helper';

// constants
import { ORDER_COLLECTION } from 'constants/collections';
import { EMPTY_ARRAY } from 'constants/empty';
import { ACTION_TYPES } from './constants';
import { ORDER_PATH } from 'constants/paths';

// types
import { Order } from 'types/order';
import { OnAction } from './types';

type UseViewOrder = () => {
  data: Order[];
  isLoading: boolean;
  onAction: OnAction;
  snackbarState: SnackbarState;
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

  const { state: snackbarState, showSnackbar } = useSnackbar();

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
          cancelOrder(phone!, payload.order).then(() => showSnackbar('Order Cancelled!', 'info'));
          break;

        case ACTION_TYPES.VIEW_RECEIPT:
          push(`${ORDER_PATH}/${payload.order.id}?phone=${phone}`);
          break;

        case ACTION_TYPES.REPEAT_ORDER:
          // FIXME:
          const queryParams = getQueryParamsFromOrder(payload.order);
          push(pathname, { query: queryParams });
          break;

        default:
          break;
      }
    },
    [phone, push, pathname, showSnackbar],
  );

  const adaptedData = React.useMemo(() => _orderBy(orders, 'createdOn', 'desc'), [orders]);

  return {
    data: adaptedData,
    isLoading,
    onAction,
    snackbarState,
  };
};

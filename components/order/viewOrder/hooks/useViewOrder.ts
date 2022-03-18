// lib
import * as React from 'react';
import _orderBy from 'lodash/orderBy';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';
import { useRouter } from 'next/router';
import { useCancelOrder } from './useCancelOrder';
import { useFetchOrderQuery } from './useFetchOrderQuery';

// helpers
import { getItemId, getOrderId } from 'helper/getter';

// constants
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
  const selectedStoreId = order.store._id;
  const selectedItemsId = [...order.items.map(getItemId)].join();
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

  const { data: orders = EMPTY_ARRAY as Order[], loading } = useFetchOrderQuery();

  const { push, pathname } = useRouter();

  const { cancelOrder } = useCancelOrder();

  const onAction: OnAction = React.useCallback(
    (action) => {
      const { type, payload } = action;
      switch (type) {
        case ACTION_TYPES.CANCEL_ORDER:
          cancelOrder(payload.order._id).then(() => showSnackbar('Order Cancelled!', 'info'));
          break;

        case ACTION_TYPES.VIEW_RECEIPT:
          push(`${ORDER_PATH}/${getOrderId(payload.order)}?phone=${phone}`);
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
    [cancelOrder, push, phone, pathname, showSnackbar],
  );

  const adaptedData = React.useMemo(() => _orderBy(orders, 'createdOn', 'desc'), [orders]);

  return {
    data: adaptedData,
    isLoading: loading,
    onAction,
    snackbarState,
  };
};

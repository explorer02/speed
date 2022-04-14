// lib
import { useCallback, useMemo } from 'react';
import _orderBy from 'lodash/orderBy';

// hooks
import { useSnackbar } from 'contexts/snackbarContext';
import { useRouter } from 'next/router';
import { useUpdateOrderStatus } from 'hooks/UpdateOrderStatus';
import { useFetchOrderQuery } from './useFetchOrderQuery';
import { useRepeatOrder } from './useRepeatOrder';

// helpers
import { getOrderId } from 'helper/getter';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { ACTION_TYPES } from './constants';
import { ORDER_PATH } from 'constants/paths';
import { ORDER_STATUS } from 'constants/order';

// types
import { Order } from 'types/order';
import { OnAction } from './types';

type UseViewOrder = () => {
  data: Order[];
  isLoading: boolean;
  onAction: OnAction;
};

export const useViewOrder: UseViewOrder = () => {
  const { onInfo } = useSnackbar();

  const { data: orders = EMPTY_ARRAY as Order[], loading } = useFetchOrderQuery();

  const repeatOrder = useRepeatOrder();

  const { push } = useRouter();

  const [updateOrder] = useUpdateOrderStatus();

  const onAction: OnAction = useCallback(
    (action) => {
      const { type, payload } = action;
      switch (type) {
        case ACTION_TYPES.CANCEL_ORDER:
          updateOrder(payload.order._id, ORDER_STATUS.CANCELLED).then(() =>
            onInfo('Order Cancelled!'),
          );
          break;

        case ACTION_TYPES.VIEW_RECEIPT:
          push(`${ORDER_PATH}/${getOrderId(payload.order)}`);
          break;

        case ACTION_TYPES.REPEAT_ORDER:
          repeatOrder(payload.order);
          break;

        default:
          break;
      }
    },
    [onInfo, push, repeatOrder, updateOrder],
  );

  const adaptedData = useMemo(() => _orderBy(orders, 'createdOn', 'desc'), [orders]);

  return {
    data: adaptedData,
    isLoading: loading,
    onAction,
  };
};

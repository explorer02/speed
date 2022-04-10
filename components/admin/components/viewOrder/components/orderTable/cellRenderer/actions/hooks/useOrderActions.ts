// lib
import { useCallback } from 'react';

// hooks
import { useUpdateOrderStatus } from 'hooks/UpdateOrderStatus';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';

// constants
import { ACTION_TYPES } from '../constants';

// types
import { Order } from 'types/order';
import { OnAction } from '../types';

type UseOrderActions = (params: { order: Order }) => {
  onAction: OnAction;
  snackbarState: SnackbarState;
};

export const useOrderActions: UseOrderActions = ({ order }) => {
  const [updateOrderStatus] = useUpdateOrderStatus();
  const { state: snackbarState, showSnackbar } = useSnackbar();

  const onAction: OnAction = useCallback(
    async (action) => {
      switch (action.type) {
        case ACTION_TYPES.MOVE_ORDER:
          try {
            await updateOrderStatus(order._id, action.payload.status);
            showSnackbar('Status Updated', 'success');
          } catch (e: any) {
            showSnackbar(e?.message ?? 'Some Error Ocurred', 'error');
          }
          break;
        default:
          break;
      }
    },
    [order._id, showSnackbar, updateOrderStatus],
  );

  return { onAction, snackbarState };
};

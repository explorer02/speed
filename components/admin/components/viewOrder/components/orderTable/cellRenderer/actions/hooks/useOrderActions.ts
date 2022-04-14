// lib
import { useCallback } from 'react';

// hooks
import { useUpdateOrderStatus } from 'hooks/useUpdateOrderStatus';
import { useSnackbar } from 'contexts/snackbarContext';

// constants
import { ACTION_TYPES } from '../constants';

// types
import { Order } from 'types/order';
import { OnAction } from '../types';

type UseOrderActions = (params: { order: Order }) => {
  onAction: OnAction;
};

export const useOrderActions: UseOrderActions = ({ order }) => {
  const [updateOrderStatus] = useUpdateOrderStatus();
  const { onSuccess, onFailure } = useSnackbar();

  const onAction: OnAction = useCallback(
    async (action) => {
      switch (action.type) {
        case ACTION_TYPES.MOVE_ORDER:
          try {
            await updateOrderStatus(order._id, action.payload.status);
            onSuccess('Status Updated');
          } catch (e: any) {
            onFailure(e?.message ?? 'Some Error Ocurred');
          }
          break;
        default:
          break;
      }
    },
    [onFailure, onSuccess, order._id, updateOrderStatus],
  );

  return { onAction };
};

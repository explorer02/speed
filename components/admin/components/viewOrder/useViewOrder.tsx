// lib
import { useMemo, useCallback } from 'react';
import dayjs from 'dayjs';

// hooks
import { useStoreList } from 'contexts/StoreListContext';
import { useLocalStorage } from 'hooks/useLocalStorage';

// constants
import { ORDER_STATUS } from 'constants/order';
import { ACTION_TYPES } from './constants';

// types
import { Action, ActionState, OnAction } from './types';

type UseViewOrder = () => {
  onAction: OnAction;
  actionState: ActionState;
};

export const useViewOrder: UseViewOrder = () => {
  const { storeList } = useStoreList();

  const initialState: ActionState = useMemo(
    () => ({
      selectedStore: storeList[0],
      startTime: dayjs().startOf('day').toDate().getTime(),
      endTime: dayjs().endOf('day').toDate().getTime(),
      statuses: [ORDER_STATUS.CREATED, ORDER_STATUS.PROCESSING, ORDER_STATUS.READY],
    }),
    [storeList],
  );

  const [actionState, setActionState] = useLocalStorage('admin_view_order_state', initialState);

  const onAction = useCallback(
    (action: Action) => {
      switch (action.type) {
        case ACTION_TYPES.CHANGE_STORE:
          setActionState((prev) => ({
            ...initialState,
            ...prev,
            selectedStore: action.payload.store,
          }));

          break;
        case ACTION_TYPES.CHANGE_START_TIME:
          setActionState((prev) => ({
            ...initialState,
            ...prev,
            startTime: action.payload.date,
          }));
          break;
        case ACTION_TYPES.CHANGE_END_TIME:
          setActionState((prev) => ({
            ...initialState,
            ...prev,
            endTime: action.payload.date,
          }));
          break;
        case ACTION_TYPES.CHANGE_STATUS:
          setActionState((prev) => ({
            ...initialState,
            ...prev,
            statuses: action.payload.statuses,
          }));
          break;

        default:
          break;
      }
    },
    [initialState, setActionState],
  );

  return {
    onAction,
    actionState: actionState ?? initialState,
  };
};

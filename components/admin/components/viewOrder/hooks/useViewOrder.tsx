// lib
import { useMemo, useCallback, useRef } from 'react';
import dayjs from 'dayjs';

// hooks
import { useStoreList } from 'contexts/StoreListContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useFetchStoreOrders } from './useFetchStoreOrders';

// helpers
import { getFromLocalStorage } from 'helper/localStorage';

// constants
import { ORDER_STATUS } from 'constants/order';
import { ACTION_TYPES } from '../constants';
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Action, ActionState, OnAction } from '../types';
import { Order } from 'types/order';

type UseViewOrder = () => {
  onAction: OnAction;
  actionState: ActionState;
  orders: Order[];
  loading: boolean;
};

const LOCAL_STORAGE_KEY = 'admin_view_order_state';

export const useViewOrder: UseViewOrder = () => {
  const { storeList } = useStoreList();

  const resetState = useMemo(
    () => ({
      selectedStore: storeList[0],
      startTime: dayjs().startOf('day').toDate().getTime(),
      endTime: dayjs().endOf('day').toDate().getTime(),
      statuses: [ORDER_STATUS.CREATED, ORDER_STATUS.PROCESSING, ORDER_STATUS.READY],
    }),
    [storeList],
  );

  const initialState: ActionState = useMemo(
    () => getFromLocalStorage(LOCAL_STORAGE_KEY) ?? resetState,
    [resetState],
  );

  // TODO: handle error
  const { fetchOrder, data, loading } = useFetchStoreOrders(initialState);

  const [actionState, setActionState] = useLocalStorage(LOCAL_STORAGE_KEY, initialState);

  const stateRef = useRef(actionState);
  stateRef.current = actionState;

  const onSubmit = useCallback(() => {
    fetchOrder(stateRef.current);
  }, [fetchOrder]);

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

        case ACTION_TYPES.SUBMIT:
          onSubmit();
          break;

        case ACTION_TYPES.RESET:
          setActionState(resetState);
          break;

        default:
          break;
      }
    },
    [initialState, onSubmit, resetState, setActionState],
  );

  return {
    onAction,
    actionState: actionState ?? initialState,
    orders: (data ?? EMPTY_ARRAY) as Order[],
    loading,
  };
};

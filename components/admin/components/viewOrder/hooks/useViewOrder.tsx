// lib
import { useMemo, useCallback, useRef } from 'react';
import dayjs from 'dayjs';

// hooks
import { useStoreList } from 'contexts/StoreListContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useFetchStoreOrders } from './useFetchStoreOrders';

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

  // TODO: handle error
  const [queryFn, { data, loading }] = useFetchStoreOrders();

  const [actionState, setActionState] = useLocalStorage('admin_view_order_state', initialState);

  const stateRef = useRef(actionState);
  stateRef.current = actionState;

  const onSubmit = useCallback(() => {
    // FIXME:  read from cache rather than network call everytime
    queryFn({
      variables: {
        query: {
          createdOn_gte: new Date(stateRef.current.startTime),
          createdOn_lte: new Date(stateRef.current.endTime),
          status_in: stateRef.current.statuses,
          store: {
            _id: stateRef.current.selectedStore._id,
          },
        },
      },
    });
  }, [queryFn]);

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

        default:
          break;
      }
    },
    [initialState, onSubmit, setActionState],
  );

  return {
    onAction,
    actionState: actionState ?? initialState,
    orders: (data ?? EMPTY_ARRAY) as Order[],
    loading,
  };
};

// lib
import * as React from 'react';
import _orderBy from 'lodash/orderBy';

// hooks
import { useRefreshTimer } from './useRefreshTimer';
import { useRouter } from 'next/dist/client/router';
import { useStateWithRef } from 'hooks/useStateWithRef';
import { useSingleStoresQuery } from 'hooks/useSingleStoreQuery';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { ACTION_TYPES, SORT_FIELDS } from './constants';
import { ORDER_PATH } from 'constants/paths';

// types
import { Item, Store } from 'types/store';
import { ActionState, OnAction } from './types';

const REFRESH_INTERVAL = 10000;

type UseStockViewer = (props: { initialStore: Store }) => {
  isRefreshActive: boolean;
  onRefresh: () => void;
  selectedStore: Store;
  selectedItems: Set<string>;
  onRowClick: (id: string) => void;
  onStoreChange: (store: Store) => void;
  data: Item[];
  isLoading: boolean;
  actionState: ActionState;
  onAction: OnAction;
};

const INITIAL_ACTION_STATE: ActionState = {
  searchInput: '',
  sortBy: {
    field: SORT_FIELDS.NAME.sortKey,
    order: 'asc',
  },
};

export const useStockViewer: UseStockViewer = ({ initialStore }) => {
  const [selectedStore, setSelectedStore] = React.useState(initialStore);
  const [selectedItems, setSelectedItems, selectedItemsRef] = useStateWithRef(new Set<string>());

  const [actionState, setActionState] = React.useState(INITIAL_ACTION_STATE);

  const { resetTimer, isRefreshActive } = useRefreshTimer(REFRESH_INTERVAL);

  const { push } = useRouter();

  const {
    data: storeWithItems,
    loading,
    refetch,
  } = useSingleStoresQuery({ _id: selectedStore._id });

  const items = storeWithItems?.items ?? (EMPTY_ARRAY as Item[]);

  const onOrder = React.useCallback(() => {
    const selectedStoreId = selectedStore._id;
    const selectedItemsId = [...selectedItemsRef.current.entries()].join();
    const queryParams = {
      store: selectedStoreId,
      items: selectedItemsId,
    };
    push({ pathname: ORDER_PATH, query: queryParams });
  }, [push, selectedItemsRef, selectedStore._id]);

  const onAction: OnAction = React.useCallback(
    (action) => {
      switch (action.type) {
        case ACTION_TYPES.STORE_CHANGE:
          setSelectedStore(action.payload.store);
          setSelectedItems(new Set());
          resetTimer();
          break;
        case ACTION_TYPES.SEARCH_INPUT_CHANGE:
          setActionState((prev) => ({ ...prev, ...action.payload }));
          resetTimer();
          break;
        case ACTION_TYPES.REFRESH:
          resetTimer();
          refetch();
          break;
        case ACTION_TYPES.SORT_FIELD_CHANGE:
          setActionState((prev) => ({
            ...prev,
            sortBy: {
              ...prev.sortBy,
              ...action.payload,
            },
          }));
          break;
        case ACTION_TYPES.SORT_ORDER_CHANGE:
          setActionState((prev) => ({
            ...prev,
            sortBy: {
              ...prev.sortBy,
              order: prev.sortBy.order === 'asc' ? 'desc' : 'asc',
            },
          }));
          break;
        case ACTION_TYPES.TOGGLE_ITEM:
          setSelectedItems((prevItems) => {
            const { id } = action.payload;
            const updatedItems = new Set(prevItems);
            if (updatedItems.has(id)) updatedItems.delete(id);
            else updatedItems.add(id);
            return updatedItems;
          });
          break;
        case ACTION_TYPES.CLEAR_SELECTION:
          setSelectedItems(new Set());
          break;
        case ACTION_TYPES.CONTINUE_TO_ORDER:
          onOrder();
          break;
        default:
          break;
      }
    },
    [onOrder, refetch, resetTimer, setSelectedItems],
  );

  const onRefresh = React.useCallback(() => onAction({ type: ACTION_TYPES.REFRESH }), [onAction]);
  const onStoreChange = React.useCallback(
    (store: Store) => onAction({ type: ACTION_TYPES.STORE_CHANGE, payload: { store } }),
    [onAction],
  );

  const adaptedData = React.useMemo(() => {
    const filteredData = items.filter(
      (datum) =>
        datum.item.label.toLowerCase().includes(actionState.searchInput.toLowerCase()) ||
        datum.item.description.toLowerCase().includes(actionState.searchInput.toLowerCase()),
    );
    const sortedData = _orderBy(
      filteredData,
      [actionState.sortBy.field],
      [actionState.sortBy.order],
    );
    return sortedData;
  }, [actionState.searchInput, actionState.sortBy.field, actionState.sortBy.order, items]);

  const onRowClick = React.useCallback(
    (id: string) => {
      onAction({ type: ACTION_TYPES.TOGGLE_ITEM, payload: { id } });
    },
    [onAction],
  );

  return {
    isRefreshActive: !loading && isRefreshActive,
    onRefresh,
    selectedStore,
    selectedItems,
    onRowClick,
    onStoreChange,
    data: adaptedData,
    isLoading: loading,
    actionState,
    onAction,
  };
};

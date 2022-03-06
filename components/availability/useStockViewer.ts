// lib
import * as React from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import _orderBy from 'lodash/orderBy';

// hooks
import { useRefreshTimer } from './useRefreshTimer';
import { useRouter } from 'next/dist/client/router';
import { useStateWithRef } from 'hooks/useStateWithRef';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { STOCK_COLLECTION_ITEM } from 'constants/collections';
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

  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);

  const {
    data = EMPTY_ARRAY as Item[],
    isLoading,
    refetch,
    isRefetching,
  } = useFirestoreQueryData<Item>([STOCK_COLLECTION_ITEM, selectedStore.id], query, {
    subscribe: true,
  });

  const onOrder = React.useCallback(() => {
    const selectedStoreId = selectedStore.id;
    const selectedItemsId = [...selectedItemsRef.current.entries()].join();
    const queryParams = {
      store: selectedStoreId,
      items: selectedItemsId,
    };
    push({ pathname: ORDER_PATH, query: queryParams });
  }, [push, selectedItemsRef, selectedStore.id]);

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
    const filteredData = data.filter(
      (datum) =>
        datum.label.toLowerCase().includes(actionState.searchInput.toLowerCase()) ||
        datum.description.toLowerCase().includes(actionState.searchInput.toLowerCase()),
    );
    const sortedData = _orderBy(
      filteredData,
      [actionState.sortBy.field],
      [actionState.sortBy.order],
    );
    return sortedData;
  }, [actionState, data]);

  const onRowClick = React.useCallback(
    (id: string) => {
      onAction({ type: ACTION_TYPES.TOGGLE_ITEM, payload: { id } });
    },
    [onAction],
  );

  return {
    isRefreshActive: isLoading || isRefetching || isRefreshActive,
    onRefresh,
    selectedStore,
    selectedItems,
    onRowClick,
    onStoreChange,
    data: adaptedData,
    isLoading: isLoading || isRefetching,
    actionState,
    onAction,
  };
};

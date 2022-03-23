// lib
import * as React from 'react';
import _difference from 'lodash/difference';

// hooks
import { useInitializeOrder } from './useInitializeOrder';
import { useStoreQueryWithItems } from 'hooks/useStoreQueryWithItems';
import { useStateWithRef } from 'hooks/useStateWithRef';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { ACTION_TYPES } from './constants';

// types
import { Item, Store } from 'types/store';
import { Action, OnAction } from './types';

type UseCreateOrder = (props: { initialStore: Store }) => {
  items: Item[];
  selectedItems: Item[];
  selectedStore: Store;
  itemsLoading: boolean;
  onStoreChange: (store: Store) => void;
  onItemChange: (items: Item[]) => void;
  onAction: OnAction;
};

export const useCreateOrder: UseCreateOrder = ({ initialStore }) => {
  const [selectedStore, setSelectedStore] = React.useState(initialStore);
  const [selectedItems, setSelectedItems, selectedItemsRef] = useStateWithRef(
    EMPTY_ARRAY as Item[],
  );

  const { data: storeWithItems, loading } = useStoreQueryWithItems({ _id: selectedStore._id });

  const items = storeWithItems?.items ?? (EMPTY_ARRAY as Item[]);

  const onAction = React.useCallback(
    (action: Action) => {
      switch (action.type) {
        case ACTION_TYPES.CHANGE_STORE:
          setSelectedStore(action.payload.store);
          setSelectedItems(EMPTY_ARRAY as Item[]);
          break;
        case ACTION_TYPES.UPDATE_ITEMS:
          setSelectedItems(action.payload.items);
          break;
        case ACTION_TYPES.REMOVE_ITEM:
          setSelectedItems((prevItems) =>
            prevItems.filter((item) => item._id !== action.payload.item._id),
          );
          break;
        case ACTION_TYPES.DECREASE_ITEM_QUANTITY:
          setSelectedItems((prevItems) => {
            const { index } = action.payload;
            if (prevItems[index].quantity === 1) return prevItems;
            const updatedItems = prevItems.slice();
            updatedItems[index].quantity -= 1;
            return updatedItems;
          });
          break;
        case ACTION_TYPES.INCREASE_ITEM_QUANTITY:
          setSelectedItems((prevItems) => {
            const { index } = action.payload;
            if (prevItems[index].quantity === 5) return prevItems;
            const updatedItems = prevItems.slice();
            updatedItems[index].quantity += 1;
            return updatedItems;
          });
          break;
        default:
          break;
      }
    },
    [setSelectedItems],
  );
  // TODO: uselocationquery
  useInitializeOrder({
    items,
    itemsLoading: loading,
    onAction,
    selectedStoreId: selectedStore._id,
  });

  const onStoreChange = React.useCallback(
    (store: Store) => {
      onAction({
        type: ACTION_TYPES.CHANGE_STORE,
        payload: {
          store,
        },
      });
    },
    [onAction],
  );

  const onItemChange = React.useCallback(
    (_items: Item[]) => {
      const prevItems = selectedItemsRef.current;
      let updatedItems = _items;
      if (_items.length > prevItems.length) {
        const addedItem = _difference(_items, prevItems)[0];
        updatedItems = [...prevItems, { ...addedItem, quantity: 1 }];
      }
      return onAction({
        type: ACTION_TYPES.UPDATE_ITEMS,
        payload: {
          items: updatedItems,
        },
      });
    },
    [selectedItemsRef, onAction],
  );

  return {
    items,
    selectedItems,
    selectedStore,
    itemsLoading: loading,
    onStoreChange,
    onItemChange,
    onAction,
  };
};

// lib
import * as React from 'react';
import _difference from 'lodash/difference';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { useLatest } from 'react-use';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// constants
import { STOCK_COLLECTION_ITEM } from 'constants/collections';
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
  const [selectedItems, setSelectedItems] = React.useState<Item[]>(EMPTY_ARRAY as Item[]);

  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);

  const { data: items = EMPTY_ARRAY as Item[], isLoading: itemsLoading } =
    useFirestoreQueryData<Item>([STOCK_COLLECTION_ITEM, selectedStore.id], query, {
      subscribe: true,
    });

  const onAction = React.useCallback((action: Action) => {
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
          prevItems.filter((item) => item.id !== action.payload.item.id),
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
  }, []);

  const onStoreChange = React.useCallback(
    (store: Store) => {
      setSelectedStore(store);
      setSelectedItems(EMPTY_ARRAY as Item[]);
      onAction({
        type: ACTION_TYPES.CHANGE_STORE,
        payload: {
          store,
        },
      });
    },
    [onAction],
  );

  const itemsRef = useLatest(selectedItems);

  const onItemChange = React.useCallback(
    (_items: Item[]) => {
      const prevItems = itemsRef.current;
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
    [itemsRef, onAction],
  );

  return {
    items,
    selectedItems,
    selectedStore,
    itemsLoading,
    onStoreChange,
    onItemChange,
    onAction,
  };
};

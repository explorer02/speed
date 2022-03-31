// lib
import { useCallback, useEffect, useState } from 'react';
import _difference from 'lodash/difference';

// hooks
import { useStoreQueryWithItems } from 'hooks/useStoreQueryWithItems';
import { useStateWithRef } from 'hooks/useStateWithRef';

// helpers
import { areItemsSame } from 'helper/getter';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { ACTION_TYPES } from './constants';

// types
import { Item, Store } from 'types/store';
import { Action, OnAction } from './types';
import { useSelectedOrderInfo } from 'contexts/SelectedOrderContext';

type UseCreateOrder = (props: { stores: Store[] }) => {
  items: Item[];
  selectedItems: Item[];
  selectedStore?: Store;
  itemsLoading: boolean;
  onStoreChange: (store: Store) => void;
  onItemChange: (items: Item[]) => void;
  onAction: OnAction;
};

export const useCreateOrder: UseCreateOrder = ({ stores }) => {
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [selectedItems, setSelectedItems, selectedItemsRef] = useStateWithRef(
    EMPTY_ARRAY as Item[],
  );

  const { data: storeWithItems, loading } = useStoreQueryWithItems({ _id: selectedStore?._id });

  const items = storeWithItems?.items ?? (EMPTY_ARRAY as Item[]);

  const { selectedOrder, setSelectedOrder } = useSelectedOrderInfo();

  useEffect(() => {
    if (selectedOrder && !selectedStore) {
      const initialStore = stores.find((s) => s._id === selectedOrder.store._id) as Store;
      setSelectedStore(initialStore);
    }
    if (selectedOrder && !loading && selectedStore) {
      const initialItems = selectedOrder.items.map((i1) => {
        const storeItem = items.find((i2) => areItemsSame(i1, i2)) as Item;
        return { ...storeItem, quantity: i1.quantity };
      });
      setSelectedItems(initialItems);
      setSelectedOrder();
    }
  }, [items, loading, selectedOrder, selectedStore, setSelectedItems, setSelectedOrder, stores]);

  const onAction = useCallback(
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

  const onStoreChange = useCallback(
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

  const onItemChange = useCallback(
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

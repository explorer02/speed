// lib
import { useEffect } from 'react';

// hooks
import { useRouter } from 'next/router';

// helpers
import { getItemId } from 'helper/getter';

// constants
import { ACTION_TYPES } from './constants';

// types
import { Item } from 'types/store';
import { OnAction } from './types';

type UseInitializeOrder = (props: {
  selectedStoreId: string;
  itemsLoading: boolean;
  items: Item[];
  onAction: OnAction;
}) => void;

export const useInitializeOrder: UseInitializeOrder = ({
  selectedStoreId,
  itemsLoading,
  items,
  onAction,
}) => {
  const { query: queryParams, replace } = useRouter();

  useEffect(() => {
    const storeId = queryParams.store;

    if (storeId && selectedStoreId === storeId && !itemsLoading) {
      const itemIds = queryParams.items;
      const parsedItemIds = new Set(((itemIds as string) ?? '').split(','));

      const toBeSelectedItems = items
        .filter((item) => parsedItemIds.has(getItemId(item)))
        .map((item) => ({ ...item, quantity: 1 }));

      // FIXME:
      console.log(items, toBeSelectedItems, parsedItemIds);

      onAction({
        type: ACTION_TYPES.UPDATE_ITEMS,
        payload: {
          items: toBeSelectedItems,
        },
      });
    }
  }, [
    items,
    itemsLoading,
    onAction,
    queryParams.items,
    queryParams.store,
    replace,
    selectedStoreId,
  ]);
};

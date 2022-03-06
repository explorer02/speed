// lib
import * as React from 'react';

// hooks
import { useRouter } from 'next/router';

// constants
import { ORDER_PATH } from 'constants/paths';
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

  React.useEffect(() => {
    const storeId = queryParams.store;

    if (storeId && selectedStoreId === storeId && !itemsLoading) {
      const itemIds = queryParams.items;
      const parsedItemIds = new Set(((itemIds as string) ?? '').split(','));

      const toBeSelectedItems = items
        .filter((item) => parsedItemIds.has(item.id))
        .map((item) => ({ ...item, quantity: 1 }));

      replace(`${ORDER_PATH}`).then(() =>
        onAction({
          type: ACTION_TYPES.UPDATE_ITEMS,
          payload: {
            items: toBeSelectedItems,
          },
        }),
      );
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

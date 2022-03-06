// lib
import * as React from 'react';

// hooks
import {
  useFirestoreCollectionMutation,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';

// helpers
import { getOrderCollectionRef } from 'helper/docReference';
import { getTotalAmount } from '../helper';

// constants
import { ORDER_STATUS } from 'constants/order';

// types
import { Order } from 'types/order';
import { Item, Store } from 'types/store';
import { useRouter } from 'next/router';
import { ORDER_COLLECTION } from 'constants/collections';

const adaptOrder = (selectedItems: Item[], selectedStore: Store): Order => ({
  id: 'DUMMY_ID',
  createdOn: Date.now(),
  items: selectedItems,
  storeId: selectedStore.id,
  status: ORDER_STATUS.CREATED,
  totalAmount: getTotalAmount(selectedItems),
});

type UseSaveOrder = (props: { selectedItems: Item[]; selectedStore: Store }) => {
  onSave: () => Promise<void>;
  isSavingOrder: boolean;
  snackbarState: SnackbarState;
};

export const useSaveOrder: UseSaveOrder = ({ selectedItems, selectedStore }) => {
  const phone = useLoginInfo().user?.phoneNumber;

  const { push, pathname } = useRouter();

  const { state: snackbarState, showSnackbar } = useSnackbar();

  const userOrderCollectionRef = React.useMemo(() => getOrderCollectionRef(phone!), [phone]);
  const { refetch: refetchOrders } = useFirestoreQueryData<Order>(
    [ORDER_COLLECTION, phone],
    userOrderCollectionRef,
    {
      subscribe: true,
    },
  );

  const { mutateAsync: saveOrder, isLoading: isSavingOrder } =
    useFirestoreCollectionMutation(userOrderCollectionRef);

  const onSave = React.useCallback(async () => {
    if (!phone) return;
    const order = adaptOrder(selectedItems, selectedStore);
    showSnackbar('Please wait while your order is placing', 'info');
    try {
      await saveOrder(order as Order);
      await refetchOrders();
      showSnackbar('Order Placed successfully :)', 'success');
      setTimeout(() => {
        push({ pathname, query: { tabId: 1 } });
      }, 500);
    } catch {
      showSnackbar('Some Error ocurred :(', 'error');
    }
  }, [pathname, phone, push, refetchOrders, saveOrder, selectedItems, selectedStore, showSnackbar]);

  return { onSave, isSavingOrder, snackbarState };
};

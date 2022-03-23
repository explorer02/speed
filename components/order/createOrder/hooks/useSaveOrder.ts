// lib
import * as React from 'react';
import _pick from 'lodash/pick';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';
import { useFetchOrderQuery } from 'components/order/viewOrder/hooks/useFetchOrderQuery';
import { OrderInsertInput, useCreateOrderMutation } from './useCreateOrderMutation';
import { useRouter } from 'next/router';

// helpers
import { getTotalAmount } from '../helper';

// types
import { Item, Store } from 'types/store';

const adaptItemsForSaving = (selectedItems: Item[]): OrderInsertInput['items'] =>
  selectedItems.map((item) => ({ ..._pick(item, 'quantity', 'price'), item: item._id }));

type UseSaveOrder = (props: { selectedItems: Item[]; selectedStore: Store }) => {
  onSave: () => Promise<void>;
  isSavingOrder: boolean;
  snackbarState: SnackbarState;
};

export const useSaveOrder: UseSaveOrder = ({ selectedItems, selectedStore }) => {
  const id = useLoginInfo().user?.id;

  const { push, pathname } = useRouter();

  const { state: snackbarState, showSnackbar } = useSnackbar();

  const { saveOrder, loading } = useCreateOrderMutation();
  const { refetch: refetchOrders } = useFetchOrderQuery({ skip: true });

  const onSave = React.useCallback(async () => {
    if (!id) return;
    showSnackbar('Please wait while your order is placing', 'info');
    try {
      await saveOrder({
        store: { link: selectedStore._id },
        user: { link: id },
        totalAmount: getTotalAmount(selectedItems),
        items: adaptItemsForSaving(selectedItems),
      });

      await refetchOrders();
      showSnackbar('Order Placed successfully :)', 'success');

      push({ pathname, query: { tabId: 1 } });
    } catch {
      showSnackbar('Some Error ocurred :(', 'error');
    }
  }, [
    id,
    pathname,
    push,
    refetchOrders,
    saveOrder,
    selectedItems,
    selectedStore._id,
    showSnackbar,
  ]);

  return { onSave, isSavingOrder: loading, snackbarState };
};

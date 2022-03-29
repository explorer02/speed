// lib
import { useCallback } from 'react';
import _pick from 'lodash/pick';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { SnackbarState, useSnackbar } from 'reusable/snackbarOverlay';
import { OrderInsertInput, useCreateOrderMutation } from './useCreateOrderMutation';
import { useRouter } from 'next/router';

// helpers
import { getTotalAmount } from '../helper';

// constants
import { ORDER_PATH } from 'constants/paths';

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

  const { push } = useRouter();

  const { state: snackbarState, showSnackbar } = useSnackbar();

  const { saveOrder, loading: isSavingOrder } = useCreateOrderMutation();

  const onSave = useCallback(async () => {
    if (!id) return;
    showSnackbar('Please wait while your order is placing', 'info');
    try {
      await saveOrder({
        store: { link: selectedStore._id },
        user: { link: id },
        totalAmount: getTotalAmount(selectedItems),
        items: adaptItemsForSaving(selectedItems),
      });

      showSnackbar('Order Placed successfully :)', 'success');

      push(ORDER_PATH);
    } catch {
      showSnackbar('Some Error ocurred :(', 'error');
    }
  }, [id, push, saveOrder, selectedItems, selectedStore._id, showSnackbar]);

  return { onSave, isSavingOrder, snackbarState };
};

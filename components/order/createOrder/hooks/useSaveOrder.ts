// lib
import { useCallback } from 'react';
import _pick from 'lodash/pick';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';
import { useSnackbar } from 'contexts/snackbarContext';
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

type UseSaveOrder = (props: { selectedItems: Item[]; selectedStore?: Store }) => {
  onSave: () => Promise<void>;
  isSavingOrder: boolean;
};

export const useSaveOrder: UseSaveOrder = ({ selectedItems, selectedStore }) => {
  const id = useLoginInfo().user?.id;

  const { push } = useRouter();

  const { onInfo, onFailure, onSuccess } = useSnackbar();

  const { saveOrder, loading: isSavingOrder } = useCreateOrderMutation();

  const onSave = useCallback(async () => {
    if (!id) return;
    onInfo('Please wait while your order is placing');
    try {
      await saveOrder({
        store: { link: selectedStore?._id ?? '' },
        user: { link: id },
        totalAmount: getTotalAmount(selectedItems),
        items: adaptItemsForSaving(selectedItems),
      });

      onSuccess('Order Placed successfully :)');

      push(ORDER_PATH);
    } catch {
      onFailure('Some Error ocurred :(');
    }
  }, [id, onFailure, onInfo, onSuccess, push, saveOrder, selectedItems, selectedStore?._id]);

  return { onSave, isSavingOrder };
};

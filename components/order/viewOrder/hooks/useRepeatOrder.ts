// lib
import { useCallback, useEffect } from 'react';

// hooks
import { useRouter } from 'next/router';
import { useSelectedOrderInfo } from 'contexts/SelectedOrderContext';

// constants
import { CREATE_ORDER_PATH } from 'constants/paths';

// types
import { Order } from 'types/order';

type UseRepeatOrder = () => (order: Order) => void;

export const useRepeatOrder: UseRepeatOrder = () => {
  const { push } = useRouter();

  const { selectedOrder, setSelectedOrder } = useSelectedOrderInfo();
    
    useEffect(() => {
        if (selectedOrder) {
            push(CREATE_ORDER_PATH)
        }
    },[push, selectedOrder])

    return useCallback((order: Order) => {
      setSelectedOrder(order);
  }, [setSelectedOrder]);
};

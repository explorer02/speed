// lib
import { createContext, useContext, useState, useMemo } from 'react';
import _noop from 'lodash/noop';

// types
import { Order } from 'types/order';

type OrderInfo = {
  selectedOrder?: Order;
  setSelectedOrder: (order?: Order) => void;
};

const SelectedOrderContext = createContext<OrderInfo>({
  setSelectedOrder: _noop,
});

export const useSelectedOrderInfo = (): OrderInfo => useContext(SelectedOrderContext);

export const SelectedOrderProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const value = useMemo(() => ({ selectedOrder, setSelectedOrder }), [selectedOrder]);

  return <SelectedOrderContext.Provider value={value}>{children}</SelectedOrderContext.Provider>;
};

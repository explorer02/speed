// lib
import { useMemo } from 'react';

// components
import { Table } from 'reusable/table';

// helpers
import { getOrderId } from 'helper/getter';
import { getColumnsConfig } from './tableConfig';

// types
import { OnAction } from '../../types';
import { Order } from 'types/order';

type Props = {
  onAction: OnAction;
  orders: Order[];
  loading: boolean;
};

export const OrderTable = ({ onAction, orders, loading }: Props): JSX.Element => {
  const columnConfig = useMemo(() => getColumnsConfig({ onAction }), [onAction]);

  return (
    <Table getId={getOrderId} columnConfig={columnConfig} items={orders} isLoading={loading} />
  );
};

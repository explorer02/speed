// components
import { Store } from './cellRenderer/Store';
import { Items } from './cellRenderer/Items';
import { Status } from './cellRenderer/Status';
import { Actions } from './cellRenderer/Actions';

// helpers
import { formatRelativeTime, priceFormatter } from 'helper/formatter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Order } from 'types/order';
import { OnAction } from './hooks/types';

export const COLUMNS = {
  SNO: 'Sno',
  TIME: 'createdOn',
  STORE: 'storeId',
  ITEMS: 'items',
  AMOUNT: 'amount',
  STATUS: 'status',
  ACTIONS: 'actions',
} as const;

export const getColumnsConfig = ({ onAction }: { onAction: OnAction }): ColumnsConfig<Order> => [
  {
    id: COLUMNS.SNO,
    label: '',
    fluidWidth: 0.25,
    valueGetter: (_, index) => `${index + 1})`,
  },
  {
    id: COLUMNS.TIME,
    label: 'Created Time',
    fluidWidth: 1,
    valueGetter: (order) => formatRelativeTime(order.createdOn),
  },
  {
    id: COLUMNS.STORE,
    label: 'Store',
    fluidWidth: 2,
    renderer: Store,
  },
  {
    id: COLUMNS.ITEMS,
    label: 'Items',
    fluidWidth: 2,
    renderer: Items,
  },
  {
    id: COLUMNS.AMOUNT,
    label: 'Total Price',
    fluidWidth: 1,
    valueGetter: (order): string => priceFormatter(order.totalAmount),
  },
  {
    id: COLUMNS.STATUS,
    label: 'Status',
    fluidWidth: 0.75,
    renderer: Status,
  },
  {
    id: COLUMNS.ACTIONS,
    label: '',
    fluidWidth: 1,
    renderer: Actions,
    rendererProps: {
      onAction,
    },
  },
];

// TODO: add status and actions [Reciept,Reorder,Cancel] field

// components
import { Store } from './cellRenderer/Store';
import { Items } from './cellRenderer/Items';

// helpers
import { formatRelativeTime, priceFormatter } from 'helper/formatter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Order } from 'types/order';
// import { OnAction } from '../hooks/types';

export const COLUMNS = {
  SNO: 'Sno',
  TIME: 'createdOn',
  STORE: 'storeId',
  ITEMS: 'items',
  AMOUNT: 'amount',
  ACTIONS: 'actions',
} as const;

export const getColumnConfig = (): ColumnsConfig<Order> => [
  {
    id: COLUMNS.SNO,
    label: 'Sno',
    fluidWidth: 0.5,
    valueGetter: (_, index) => index + 1,
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
    id: COLUMNS.ACTIONS,
    label: '',
    fluidWidth: 1,
  },
];

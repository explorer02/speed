// components
import { Actions } from './cellRenderer/actions';
import { Items } from 'reusable/cellRenderers/Items';
import { Status } from 'reusable/cellRenderers/Status';

// helpers
import { formatRelativeTime, priceFormatter } from 'helper/formatter';
import { getUserNameFromOrder } from 'helper/getter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Order } from 'types/order';
import { OnAction } from '../../types';

export const COLUMNS = {
  SNO: 'Sno',
  USER_NAME: 'userName',
  TIME: 'createdOn',
  ITEMS: 'items',
  STATUS: 'status',
  AMOUNT: 'amount',
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
    id: COLUMNS.USER_NAME,
    label: 'User',
    fluidWidth: 1,
    valueGetter: getUserNameFromOrder,
  },
  {
    id: COLUMNS.TIME,
    label: 'Created Time',
    fluidWidth: 1,
    valueGetter: (order) => formatRelativeTime(order.createdOn),
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
    label: 'Actions',
    fluidWidth: 1,
    renderer: Actions,
  },
];

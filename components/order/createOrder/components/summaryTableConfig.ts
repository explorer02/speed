// components
import { Quantity } from './renderer/Quantity';
import { TotalPrice } from './renderer/TotalPrice';
import { Name } from './renderer/Name';

// helpers
import { priceFormatter } from 'helper/formatter';
import { getItemLabel, getItemUnit } from 'helper/getter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Item } from 'types/store';
import { OnAction } from '../hooks/types';

export const COLUMNS = {
  LABEL: 'label',
  PRICE: 'price',
  QUANTITY: 'quantity',
  TOTAL_PRICE: 'totalPrice',
} as const;

export const getColumnConfig = (onAction: OnAction): ColumnsConfig<Item> => [
  {
    id: COLUMNS.LABEL,
    label: 'Name',
    fluidWidth: 2,
    renderer: Name,
    valueGetter: getItemLabel,
  },
  {
    id: COLUMNS.PRICE,
    label: 'Price',
    fluidWidth: 2,
    valueGetter: (item): string => priceFormatter(item.price),
  },
  {
    id: COLUMNS.QUANTITY,
    label: 'Quantity',
    fluidWidth: 2,
    valueGetter: (item): string => `${item.quantity} ${getItemUnit(item)}`,
    renderer: Quantity,
    rendererProps: {
      onAction,
    },
  },
  {
    id: COLUMNS.TOTAL_PRICE,
    label: 'Total Price',
    fluidWidth: 2,
    valueGetter: (item): string => priceFormatter(item.quantity * item.price),
    renderer: TotalPrice,
    rendererProps: {
      onAction,
    },
  },
];

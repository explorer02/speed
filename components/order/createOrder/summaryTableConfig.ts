// components
import { Quantity } from './renderer/Quantity';
import { TotalPrice } from './renderer/TotalPrice';
import { Name } from './renderer/Name';

// helpers
import { priceFormatter } from 'helper/formatter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Item } from 'types/store';
import { OnAction } from './types';

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
  },
  {
    id: COLUMNS.PRICE,
    label: 'Price',
    fluidWidth: 1,
    valueGetter: (item): string => priceFormatter(item.price),
  },
  {
    id: COLUMNS.QUANTITY,
    label: 'Quantity',
    fluidWidth: 2,
    valueGetter: (item): string => `${item.quantity} ${item.unit}`,
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

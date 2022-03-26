// components

// helpers
import { priceFormatter } from 'helper/formatter';
import { getItemLabel, getItemUnit } from 'helper/getter';

// types
import { ColumnsConfig } from 'reusable/table';
import { Item } from 'types/store';

export const COLUMNS = {
  LABEL: 'label',
  PRICE: 'price',
  QUANTITY: 'quantity',
  TOTAL_PRICE: 'totalPrice',
} as const;

export const COLUMN_CONFIG: ColumnsConfig<Item> = [
  {
    id: COLUMNS.LABEL,
    label: 'Name',
    fluidWidth: 2,
    valueGetter: getItemLabel,
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
    valueGetter: (item): string => `${item.quantity} ${getItemUnit(item)}`,
  },
  {
    id: COLUMNS.TOTAL_PRICE,
    label: 'Total Price',
    fluidWidth: 2,
    valueGetter: (item): string => priceFormatter(item.quantity * item.price),
  },
];

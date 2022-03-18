// helpers
import { priceFormatter } from 'helper/formatter';
import { getItemDescription, getItemLabel, getItemUnit } from 'helper/getter';

// types
import { Item } from 'types/store';
import { ColumnsConfig } from 'reusable/table';

export const COLUMNS = {
  LABEL: 'label',
  PRICE: 'price',
  QUANTITY: 'quantity',
  DESCRIPTION: 'description',
} as const;

export const columnsConfig: ColumnsConfig<Item> = [
  {
    id: COLUMNS.LABEL,
    label: 'Name',
    fluidWidth: 1,
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
    fluidWidth: 1,
    valueGetter: (item): string => `${item.quantity} ${getItemUnit(item)}`,
  },
  {
    id: COLUMNS.DESCRIPTION,
    label: 'Description',
    fluidWidth: 4,
    valueGetter: getItemDescription,
  },
];

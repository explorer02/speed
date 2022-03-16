// helper
import { priceFormatter } from 'helper/formatter';

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
    valueGetter: (item): string => item.item.label,
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
    valueGetter: (item): string => `${item.quantity} ${item.item.unit}`,
  },
  {
    id: COLUMNS.DESCRIPTION,
    label: 'Description',
    fluidWidth: 4,
    valueGetter: (item): string => item.item.description,
  },
];

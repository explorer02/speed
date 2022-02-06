// helpers
import { priceFormatter } from 'helper/formatter';

// types
import { Item } from 'types/store';

export const COLUMNS = {
  LABEL: 'label',
  PRICE: 'price',
  QUANTITY: 'quantity',
  TOTAL_PRICE: 'totalPrice',
} as const;

export const columnsConfig: {
  id: string;
  label: string;
  valueGetter?: (item: Item) => string;
}[] = [
  {
    id: COLUMNS.LABEL,
    label: 'Name',
  },
  {
    id: COLUMNS.PRICE,
    label: 'Price',
    valueGetter: (item): string => priceFormatter(item.price),
  },
  {
    id: COLUMNS.QUANTITY,
    label: 'Quantity',
    valueGetter: (item): string => `${item.quantity} ${item.unit}`,
  },
  {
    id: COLUMNS.TOTAL_PRICE,
    label: 'Total Price',
    valueGetter: (item): string => priceFormatter(item.quantity * item.price),
  },
];

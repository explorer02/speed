// types
import { Item } from 'types/store';

export const getTotalAmount = (selectedItems: Item[]): number =>
  selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

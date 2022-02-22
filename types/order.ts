// constants
import { ORDER_STATUS } from 'constants/order';

// types
import { ValueOf } from './generic';
import { Item } from './store';

export type Order = {
  id: string;
  storeId: string;
  items: Item[];
  totalAmount: number;
  createdOn: number;
  updatedOn?: number;
  status: ValueOf<typeof ORDER_STATUS>;
};

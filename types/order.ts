// constants
import { ORDER_STATUS } from 'constants/order';

// types
import { ValueOf } from './generic';
import { UserProfile } from './profile';
import { Item, Store } from './store';

export type Order = {
  _id: string;
  store: Store;
  items: Item[];
  totalAmount: number;
  createdOn: number;
  updatedOn: number;
  status: ValueOf<typeof ORDER_STATUS>;
  user?: UserProfile;
};

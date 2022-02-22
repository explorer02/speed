// types
import { Location } from './location';
import { Order } from './order';

export type Address = {
  houseNumber?: string;
  street?: string;
  locality?: string;
  area?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pinCode?: string;
};

export type UserProfile = {
  name?: string;
  location?: Location;
  address?: Address;
  phone?: string;
  orders?: Order[];
};

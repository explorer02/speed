// types
import { Location } from './location';

export type Store = {
  address: string;
  _id: string;
  name: string;
  location: Location;
  items?: Item[];
};

export type BaseItem = {
  _id: string;
  label: string;
  unit: string;
  description: string;
};

export type Item = {
  item: BaseItem;
  _id: string;
  quantity: number;
  price: number;
};

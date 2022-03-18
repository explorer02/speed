// types
import { Location } from './location';

export type Store = {
  address: string;
  _id: string;
  name: string;
  location: Location;
  items?: Item[];
};

export type Item = {
  item: {
    _id: string;
    label: string;
    unit: string;
    description: string;
  };
  _id: string;
  quantity: number;
  price: number;
};

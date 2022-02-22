// types
import { Location } from './location';

export type Store = {
  address: string;
  id: string;
  name: string;
  location: Location;
};

export type Item = {
  id: string;
  label: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
};

// types
import googleMapReact from 'google-map-react';

export type Store = {
  address: string;
  id: string;
  name: string;
  location: googleMapReact.Coords;
};

export type Item = {
  id: string;
  label: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
};

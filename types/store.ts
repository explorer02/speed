// types
import googleMapReact from 'google-map-react';

export type Store = {
  address: string;
  id: string;
  name: string;
  location: googleMapReact.Coords;
};

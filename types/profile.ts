// types
import googleMapReact from 'google-map-react';

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
  location?: googleMapReact.Coords & {
    addressText?: string;
  };
  address?: Address;
  phone?: string;
};

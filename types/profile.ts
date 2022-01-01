import { GeoPoint } from 'firebase/firestore';

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
  location?: GeoPoint;
  address?: Address;
  phone?: string;
};

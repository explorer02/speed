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

export type Location = Pick<GeoPoint, 'latitude' | 'longitude'>;

export type UserProfile = {
  name?: string;
  location?: Location;
  address?: Address;
  phone?: string;
  docId?: string;
};

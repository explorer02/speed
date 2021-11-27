export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export type User = {
  name: string;
  phone: string;
  location: GeoLocation;
};

// lib
import Geocode from 'react-geocode';

// helpers
import { getFromLocalStorage, setToLocalStorage } from './localStorage';

// types
import { Location } from 'types/location';

// ****** SET GEOCODE DEFAULTS ***** */
Geocode.setLanguage('en');
Geocode.setRegion('in');
Geocode.setApiKey(process.env.NEXT_PUBLIC_MAP_API_KEY!);
// ********************************* */

// TODO: Add expiry to location address data
export const getAddressFromLocalStorage = (location: Location): string | undefined => {
  const address = getFromLocalStorage(JSON.stringify(location));
  return address;
};
export const saveAddressToLocalStorage = (location: Location, address: string): void => {
  setToLocalStorage(JSON.stringify(location), address);
};

export const fetchGeoAddress = async (location: Location): Promise<string> => {
  try {
    const storedAddress = getAddressFromLocalStorage(location);
    if (storedAddress) {
      return storedAddress;
    }
    const response = await Geocode.fromLatLng(`${location.lat}`, `${location.lng}`);
    const address = response?.results?.[0]?.formatted_address;
    saveAddressToLocalStorage(location, address);
    return address;
  } catch (err) {
    console.error(err);
  }
  return '';
};

// helper
import { getFromLocalStorage, setToLocalStorage } from 'helper/localStorage';

// constants
import { REGEX_VALUES } from './constants';

// types
import googleMapReact from 'google-map-react';

export const formValidator = ({
  id,
  subid,
  value,
}: {
  id: string;
  subid?: string;
  value: string;
}): string | number => {
  switch (id) {
    case 'name': {
      const regexResult = value.match(REGEX_VALUES[id]) ?? [];
      return regexResult.join('');
    }
    case 'location': {
      return parseFloat(value);
    }
    case 'address': {
      switch (subid) {
        case 'pinCode': {
          const regexResult = value.match(REGEX_VALUES[id][subid]) ?? [];
          return regexResult.join('').substring(0, 6);
        }
        default:
          return value;
      }
    }
    default:
      return value;
  }
};

// TODO: Add expiry to location address data
export const getAddressFromLocalStorage = (location: googleMapReact.Coords): string | undefined => {
  const address = getFromLocalStorage(JSON.stringify(location));
  return address;
};
export const saveAddressToLocalStorage = (
  location: googleMapReact.Coords,
  address: string,
): void => {
  setToLocalStorage(JSON.stringify(location), address);
};

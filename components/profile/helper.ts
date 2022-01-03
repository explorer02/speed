// lib
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Query,
  query,
  where,
} from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// converters
import { profileConverter } from 'converters/userProfile';

// helper
import { getFromLocalStorage, setToLocalStorage } from 'helper/localStorage';

// constants
import { USER_COLLECTION } from 'constants/collections';
import { REGEX_VALUES } from './constants';

// types
import { Location } from 'types/profile';

export const getCurrentUserProfileQuery = (phone?: string): Query | undefined => {
  const usersRef = collection(fireStore, USER_COLLECTION).withConverter(profileConverter);
  return phone ? query(usersRef, where('phone', '==', phone)) : undefined;
};

export const getCurrentUserAddProfileDocRef = (): DocumentReference<DocumentData> =>
  doc(fireStore, USER_COLLECTION).withConverter(profileConverter);

export const getCurrentUserUpdateProfileDocRef = (docId: string): DocumentReference<DocumentData> =>
  doc(fireStore, USER_COLLECTION, docId).withConverter(profileConverter);

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
export const getAddressFromLocalStorage = (location: Location): string | undefined => {
  const address = getFromLocalStorage(JSON.stringify(location));
  return address;
};
export const saveAddressToLocalStorage = (location: Location, address: string): void => {
  setToLocalStorage(JSON.stringify(location), address);
};

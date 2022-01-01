// lib
import { collection, FirestoreDataConverter, Query, query, where } from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// helper
import { getFromLocalStorage, setToLocalStorage } from 'helper/localStorage';

// constants
import { USER_COLLECTION } from 'constants/collections';
import { REGEX_VALUES } from './constants';

// types
import { Location } from 'types/profile';
import { UserProfile } from 'firebase/auth';

const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (profile) => {
    // TODO:
    console.log(profile);
    return profile;
  },
  fromFirestore: (snapshot, options): UserProfile => {
    const data = snapshot.data(options);
    return {
      ...data,
      location: {
        latitude: data?.location?._lat,
        longitude: data?.location?._long,
      },
    };
  },
};

export const getCurrentUserProfileQuery = (phone?: string): Query | undefined => {
  const usersRef = collection(fireStore, USER_COLLECTION).withConverter(profileConverter);
  return phone ? query(usersRef, where('phone', '==', phone)) : undefined;
};

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

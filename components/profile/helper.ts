// lib
import { collection, Query, query, where } from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// constants
import { USER_COLLECTION } from 'constants/collections';

export const getCurrentUserProfileQuery = (phone?: string): Query | undefined => {
  const usersRef = collection(fireStore, USER_COLLECTION);
  return phone ? query(usersRef, where('phoneNumber', '==', phone)) : undefined;
};

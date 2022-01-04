// lib
import { collection, doc, DocumentData, DocumentReference } from 'firebase/firestore';

// converters
import { profileConverter } from 'converters/userProfile';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// constants
import { USER_COLLECTION } from 'constants/collections';

export const getUserProfileDocRef = (docId: string): DocumentReference<DocumentData> =>
  doc(collection(fireStore, USER_COLLECTION), docId).withConverter(profileConverter);

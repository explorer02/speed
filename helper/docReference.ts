// lib
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';

// converters
import { profileConverter } from 'converters/userProfile';
import { storeConverter } from 'converters/store';
import { itemConverter } from 'converters/item';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// constants
import {
  STOCK_COLLECTION,
  STOCK_COLLECTION_ITEM,
  STORE_COLLECTION,
  USER_COLLECTION,
} from 'constants/collections';

export const getUserProfileDocRef = (docId: string): DocumentReference<DocumentData> =>
  doc(collection(fireStore, USER_COLLECTION), docId).withConverter(profileConverter);

export const getStoreCollectionRef = (): CollectionReference<DocumentData> =>
  collection(fireStore, STORE_COLLECTION).withConverter(storeConverter);

export const getStoreItemCollectionRef = (storeId: string): CollectionReference<DocumentData> =>
  collection(fireStore, STOCK_COLLECTION, storeId, STOCK_COLLECTION_ITEM).withConverter(
    itemConverter,
  );

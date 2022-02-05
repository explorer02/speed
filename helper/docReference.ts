// lib
import { collection, CollectionReference, doc, DocumentReference } from 'firebase/firestore';

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

// types
import { Item, Store } from 'types/store';
import { UserProfile } from 'types/profile';

export const getUserProfileDocRef = (docId: string): DocumentReference<UserProfile> =>
  doc(collection(fireStore, USER_COLLECTION), docId).withConverter(profileConverter);

export const getStoreCollectionRef = (): CollectionReference<Store> =>
  collection(fireStore, STORE_COLLECTION).withConverter(storeConverter);

export const getStoreItemCollectionRef = (storeId: string): CollectionReference<Item> =>
  collection(fireStore, STOCK_COLLECTION, storeId, STOCK_COLLECTION_ITEM).withConverter(
    itemConverter,
  );

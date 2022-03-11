// lib
import { collection, CollectionReference, doc, DocumentReference } from 'firebase/firestore';

// converters
import { profileConverter } from 'converters/userProfile';
import { storeConverter } from 'converters/store';
import { itemConverter } from 'converters/item';
import { orderConverter } from 'converters/order';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// constants
import {
  ORDER_COLLECTION,
  STOCK_COLLECTION,
  STOCK_COLLECTION_ITEM,
  STORE_COLLECTION,
  USER_COLLECTION,
} from 'constants/collections';

// types
import { Item, Store } from 'types/store';
import { UserProfile } from 'types/profile';
import { Order } from 'types/order';

export const getUserProfileDocRef = (phone: string): DocumentReference<UserProfile> =>
  doc(collection(fireStore, USER_COLLECTION), phone).withConverter(profileConverter);

export const getStoreCollectionRef = (): CollectionReference<Store> =>
  collection(fireStore, STORE_COLLECTION).withConverter(storeConverter);

export const getStoreItemCollectionRef = (storeId: string): CollectionReference<Item> =>
  collection(fireStore, STOCK_COLLECTION, storeId, STOCK_COLLECTION_ITEM).withConverter(
    itemConverter,
  );

export const getOrderCollectionRef = (phone: string): CollectionReference<Order> =>
  collection(fireStore, USER_COLLECTION, phone, ORDER_COLLECTION).withConverter(orderConverter);

export const getSingleOrderRef = (phone: string, oid: string): DocumentReference<Order> =>
  doc(collection(fireStore, USER_COLLECTION, phone, ORDER_COLLECTION), oid).withConverter(
    orderConverter,
  );

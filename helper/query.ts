// lib
import { collection, Query, query } from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// converters
import { storeConverter } from 'converters/store';
import { itemConverter } from 'converters/item';

// constants
import { STORE_COLLECTION } from 'constants/collections';
import { getStoreItemCollectionRef } from './docReference';

// types
import { Item, Store } from 'types/store';

const storeRef = collection(fireStore, STORE_COLLECTION);

export const getQueryForStoreList = (): Query<Store> =>
  query(storeRef).withConverter(storeConverter);

export const getQueryForStoreItems = (storeId: string): Query<Item> =>
  query(getStoreItemCollectionRef(storeId)).withConverter(itemConverter);

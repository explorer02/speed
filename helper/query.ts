// lib
import { collection, DocumentData, Query, query } from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// converters
import { storeConverter } from 'converters/store';
import { itemConverter } from 'converters/item';

// constants
import { STORE_COLLECTION } from 'constants/collections';
import { getStoreItemCollectionRef } from './docReference';

const storeRef = collection(fireStore, STORE_COLLECTION);

export const getQueryForStoreList = (): Query<DocumentData> =>
  query(storeRef).withConverter(storeConverter);

export const getQueryForStoreItems = (storeId: string): Query<DocumentData> =>
  query(getStoreItemCollectionRef(storeId)).withConverter(itemConverter);

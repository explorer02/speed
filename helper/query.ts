// lib
import { collection, DocumentData, Query, query } from 'firebase/firestore';

// firebaseConfig
import { fireStore } from 'firebaseConfig';

// constants
import { STORE_COLLECTION } from 'constants/collections';

const storeRef = collection(fireStore, STORE_COLLECTION);

export const getQueryForStoreData = (): Query<DocumentData> => query(storeRef);

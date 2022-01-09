// types
import { FirestoreDataConverter } from 'firebase/firestore';

import { Store } from 'types/store';

export const storeConverter: FirestoreDataConverter<Store> = {
  toFirestore: (store: Store) => store,
  fromFirestore: (snapshot, options): Store => {
    const data = snapshot.data(options);
    return {
      ...data,
      location: {
        lat: data?.location._lat,
        lng: data?.location._long,
      },
    } as Store;
  },
};

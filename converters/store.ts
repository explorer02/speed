// lib
import _omit from 'lodash/omit';
import { FirestoreDataConverter, GeoPoint } from 'firebase/firestore';

// types
import { Store } from 'types/store';

export const storeConverter: FirestoreDataConverter<Store> = {
  toFirestore: (store: Store) => ({
    ..._omit(store, ['location', 'id']),
    location: new GeoPoint(store.location.lat, store.location.lng),
  }),
  fromFirestore: (snapshot, options): Store => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      location: {
        lat: data?.location._lat,
        lng: data?.location._long,
      },
    } as Store;
  },
};

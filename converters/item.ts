// lib
import _omit from 'lodash/omit';
import { FirestoreDataConverter } from 'firebase/firestore';

// types
import { Item } from 'types/store';

export const itemConverter: FirestoreDataConverter<Item> = {
  toFirestore: (item: Item) => _omit(item, ['id']) as Item,
  fromFirestore: (snapshot, options): Item => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as Item;
  },
};

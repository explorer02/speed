// lib
import _omit from 'lodash/omit';
import { FirestoreDataConverter } from 'firebase/firestore';

// types
import { Order } from 'types/order';

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore: (order: Order) => _omit(order, ['id']) as Order,
  fromFirestore: (snapshot, options): Order => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as unknown as Order;
  },
};

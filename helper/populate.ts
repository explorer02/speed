// @ts-ignore
// @ts-nocheck

import { addDoc, CollectionReference, getDocs, WithFieldValue } from 'firebase/firestore';
import { Item, Store } from 'types/store';
import { getStoreCollectionRef, getStoreItemCollectionRef } from './docReference';
import { fake, build } from '@jackfranklin/test-data-bot';

const populator = async <T = any>(
  collectionRef: CollectionReference<T>,
  data: WithFieldValue<T>,
): Promise<any> => addDoc(collectionRef, data);

const buildStore = build<Store>({
  fields: {
    _id: fake((f) => f.random.alphaNumeric(10)),
    address: fake((f) => f.address.streetAddress()),
    name: fake((f) => f.company.companyName()),
    location: {
      lat: fake((f) => Number(f.address.latitude(29.0272803, 28.0272803))),
      lng: fake((f) => Number(f.address.longitude(77.9688997, 76.4688997))),
    },
  },
});

export const populateStore = (): void => {
  const collectionRef = getStoreCollectionRef();
  for (let i = 0; i < 20; i += 1) {
    const storeItem = buildStore();
    populator(collectionRef, storeItem);
  }
};

const buildItem = build<Item>({
  fields: {
    _id: fake((f) => f.random.alphaNumeric(10)),
    label: fake((f) => f.commerce.product()),
    quantity: fake((f) => f.random.number(10)),
    unit: fake((f) => f.commerce.productAdjective()),
    price: fake((f) => Number(f.commerce.price())),
    description: fake((f) => f.commerce.productDescription()),
  },
});

export const populateStoreWithItems = async (): Promise<void> => {
  const collectionRef = getStoreCollectionRef();
  const docs = await getDocs(collectionRef);
  const stores = docs.docs.map((doc) => doc.data());

  stores.slice(0).forEach((store) => {
    const numOfItems = Math.floor(Math.random() * 20);
    const storeItemCollectionRef = getStoreItemCollectionRef(store.id);
    for (let i = 0; i < numOfItems; i += 1) {
      addDoc(storeItemCollectionRef, buildItem());
    }
  });
};

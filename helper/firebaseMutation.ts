import { DocumentReference, setDoc } from 'firebase/firestore';

export const mutate = <T>(docRef: DocumentReference<T>, data: T): Promise<void> =>
  setDoc(docRef, data);

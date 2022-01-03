// lib
import * as React from 'react';
import { addDoc, CollectionReference, DocumentReference } from 'firebase/firestore';

export const useFireStoreAddMutation = <T>(): Function =>
  React.useCallback(
    async (docRef: CollectionReference<T>, data: T): Promise<DocumentReference<T>> =>
      addDoc<T>(docRef, data),
    [],
  );

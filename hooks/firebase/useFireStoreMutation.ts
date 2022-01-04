// lib
import * as React from 'react';
import { DocumentReference, setDoc, WithFieldValue } from 'firebase/firestore';

export const useFireStoreMutation = <T>(): Function =>
  React.useCallback(
    async (docRef: DocumentReference<T>, data: WithFieldValue<T>): Promise<void> =>
      setDoc(docRef, data),
    [],
  );

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCI3nqR_LRPnfCEpAUqxgJVdnzKEbY6vD0',
  authDomain: 'speed-816fd.firebaseapp.com',
  projectId: 'speed-816fd',
  storageBucket: 'speed-816fd.appspot.com',
  messagingSenderId: '417742948516',
  appId: '1:417742948516:web:9a9e8497506c79120dbe31',
  measurementId: 'G-G2J3K3LRX1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);

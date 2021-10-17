// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI3nqR_LRPnfCEpAUqxgJVdnzKEbY6vD0",
  authDomain: "speed-816fd.firebaseapp.com",
  projectId: "speed-816fd",
  storageBucket: "speed-816fd.appspot.com",
  messagingSenderId: "417742948516",
  appId: "1:417742948516:web:9a9e8497506c79120dbe31",
  measurementId: "G-G2J3K3LRX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

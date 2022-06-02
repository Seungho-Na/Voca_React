import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyC5KD3zBvtZ8DXwtMssH9qqR8TuQ1aLCSE',
  authDomain: 'voca-react-d1760.firebaseapp.com',
  projectId: 'voca-react-d1760',
  storageBucket: 'voca-react-d1760.appspot.com',
  messagingSenderId: '385601465311',
  appId: '1:385601465311:web:4663894821cf26d3e2326a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

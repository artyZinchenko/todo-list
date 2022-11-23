import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBy70Mzz6d1UjGAPX2ZTTUGF1QKA7VA_IY',
  authDomain: 'todo-app-df245.firebaseapp.com',
  projectId: 'todo-app-df245',
  storageBucket: 'todo-app-df245.appspot.com',
  messagingSenderId: '934073600645',
  appId: '1:934073600645:web:485033308e96977cad37ec',
  measurementId: 'G-RXWK7WWPLD',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

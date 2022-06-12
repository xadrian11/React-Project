import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { firebase } from '../../config.json';

const app = initializeApp(firebase);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

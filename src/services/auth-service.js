import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export async function signUp({ email, password, name, lastname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await auth.updateCurrentUser(user);

  await addDoc(collection(db, 'users'), {
    name,
    email,
    lastname,
    id: user.uid,
    following: [],
    followers: [],
    avatarURL: null,
  });

  return auth.currentUser;
}

export async function signIn({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await auth.updateCurrentUser(user);

  return auth.currentUser;
}

export async function signOut() {
  await auth.signOut();
}

export function onAuthStateChanged(callback) {
  const unsubscribe = auth.onAuthStateChanged(callback);
  return unsubscribe;
}

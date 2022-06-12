import { auth, db, storage } from './firebase';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function getUserById(id) {
  const { docs } = await getDocs(
    query(collection(db, 'users'), where('id', '==', id)),
  );
  const data = docs.pop().data();
  return {
    ...data,
    avatarURL: data.avatarURL
      ? data.avatarURL
      : '/team-mw-project-2/images/avatar-icon.png',
  };
}

export async function getCurrentUser() {
  await new Promise((resolve) => auth.onIdTokenChanged(resolve));
  if (auth.currentUser === null) {
    return null;
  }
  return await getUserById(auth.currentUser.uid);
}

export async function getFollowing(userId) {
  const user = await getUserById(userId);

  if (user.following.length === 0) {
    return [];
  }

  const { docs } = await getDocs(
    query(collection(db, 'users'), where('id', 'in', user.following)),
  );

  return docs.map((d) => d.data());
}

export async function followUser({ userId, undo = false }) {
  const { docs } = await getDocs(
    query(
      collection(db, 'users'),
      where('id', 'in', [auth.currentUser.uid, userId]),
    ),
  );

  const followingUserDoc = docs.find((d) => d.data().id === userId);
  const currentUserDoc = docs.find((d) => d.data().id === auth.currentUser.uid);
  const following = undo
    ? currentUserDoc.data().following.filter((id) => id !== userId)
    : Array.from(new Set([...currentUserDoc.data().following, userId]));
  const followers = undo
    ? followingUserDoc
        .data()
        .followers.filter((id) => id !== auth.currentUser.uid)
    : Array.from(
        new Set([...followingUserDoc.data().followers, auth.currentUser.uid]),
      );

  await updateDoc(currentUserDoc.ref, {
    following,
  });

  await updateDoc(followingUserDoc.ref, {
    followers,
  });
  return { followers, following };
}

export async function updateCurrentUser({ name, lastname, imgFile } = {}) {
  const { docs } = await getDocs(
    query(collection(db, 'users'), where('id', '==', auth.currentUser.uid)),
  );

  let imgURL = null;
  const doc = docs.pop();

  if (imgFile) {
    const { metadata } = await uploadBytes(
      ref(storage, auth.currentUser.uid),
      imgFile,
    );
    imgURL = await getDownloadURL(ref(storage, metadata.fullPath));
  }

  await updateDoc(doc.ref, {
    name: name || doc.data().name,
    lastname: lastname || doc.data().lastname,
    avatarURL: imgURL || doc.data().avatarURL,
  });

  return await getCurrentUser();
}

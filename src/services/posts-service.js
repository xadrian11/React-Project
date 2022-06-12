import { db, storage } from './firebase';
import { v4 as uuid } from 'uuid';
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getCurrentUser, getFollowing, getUserById } from './users-service';

export async function createPost({ description, imgFile }) {
  const user = await getCurrentUser();
  const { metadata } = await uploadBytes(ref(storage, uuid()), imgFile);
  const imgURL = await getDownloadURL(ref(storage, metadata.fullPath));
  await addDoc(collection(db, 'posts'), {
    imgURL,
    description,
    id: uuid(),
    likes: [],
    comments: [],
    author: user.id,
    createdAt: new Date().getTime(),
  });
}

export async function getPostById(postId) {
  const { docs } = await getDocs(
    query(collection(db, 'posts'), where('id', '==', postId)),
  );
  const post = docs.pop().data();
  let comments = [];
  for (let comment of post.comments) {
    comments.push({
      ...comment,
      author: await getUserById(post.author),
    });
  }
  return {
    ...post,
    comments,
    author: await getUserById(post.author),
  };
}

export async function getUserPosts(userId) {
  const user = await getUserById(userId);

  const { docs } = await getDocs(
    query(collection(db, 'posts'), where('author', '==', user.id)),
  );
  let posts = [];
  for (let doc of docs) {
    const post = doc.data();
    let comments = [];
    for (let comment of post.comments) {
      comments.push({
        ...comment,
        author: await getUserById(post.author),
      });
    }
    posts.push({ ...post, author: await getUserById(post.author), comments });
  }
  return posts.sort((postA, postB) => postB.createdAt - postA.createdAt);
}

export async function getTimelinePosts() {
  const user = await getCurrentUser();
  const following = await getFollowing(user.id);

  const timeline = [];
  for (let { id } of [].concat(user, following)) {
    const posts = await getUserPosts(id);
    timeline.push(...posts);
  }

  return timeline.sort((postA, postB) => postB.createdAt - postA.createdAt);
}

export async function likePost(postId, undo = false) {
  const user = await getCurrentUser();

  const { docs } = await getDocs(
    query(collection(db, 'posts'), where('id', '==', postId)),
  );

  const doc = docs.pop();

  const likes = undo
    ? doc.data().likes.filter((id) => id !== user.id)
    : Array.from(new Set([...doc.data().likes, user.id]));

  await updateDoc(doc.ref, { likes });

  return likes;
}

export async function commentPost({ postId, content }) {
  const user = await getCurrentUser();

  const { docs } = await getDocs(
    query(collection(db, 'posts'), where('id', '==', postId)),
  );

  const doc = docs.pop();
  const comments = Array.from(
    new Set([
      ...doc.data().comments,
      {
        content,
        id: uuid(),
        author: user.id,
      },
    ]),
  );
  await updateDoc(doc.ref, { comments });
  const updatedPost = await getPostById(postId);
  return updatedPost.comments;
}

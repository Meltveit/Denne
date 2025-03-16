import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Post } from "./types"; // Importer Post-typen

const firebaseConfig = {
  apiKey: "AIzaSyCyPn-Lhu7smXuYleDFBqwuiAH1r71Y4xs",
  authDomain: "bsocial-5872f.firebaseapp.com",
  projectId: "bsocial-5872f",
  storageBucket: "bsocial-5872f.firebasestorage.app",
  messagingSenderId: "680948415961",
  appId: "1:680948415961:web:e3a115fd3e90bc080e6dc8",
  measurementId: "G-P1R7R2T9VZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Hjelpefunksjoner for å håndtere data
export const createPost = async (post: Omit<Post, "id" | "timestamp">) => {
  const postRef = await addDoc(collection(db, "posts"), {
    ...post,
    timestamp: Timestamp.now().toMillis(),
  });
  return postRef.id;
};

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Begrens innlegg til 2 per uke
export const canCreatePost = async (businessId: string) => {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const postsQuery = query(
    collection(db, "posts"),
    where("businessId", "==", businessId),
    where("timestamp", ">=", startOfWeek.getTime())
  );
  const postsSnap = await getDocs(postsQuery);
  return postsSnap.size < 2;
};
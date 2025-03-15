// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Post } from "./types"; // Importer Post-typen

const firebaseConfig = {
  // Legg til din Firebase-konfigurasjon her
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Hook for å håndtere autentiseringstilstand
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [user, loading];
};

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
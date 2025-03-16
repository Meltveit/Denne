import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post } from "@/lib/types";
import PostsComponent from "./PostsComponent";

// Hent data direkte i Server Component
export default async function PostsPage() {
  const postsSnap = await getDocs(collection(db, "posts"));
  const postsData = postsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return <PostsComponent initialPosts={postsData.sort((a, b) => b.timestamp - a.timestamp)} />;
}
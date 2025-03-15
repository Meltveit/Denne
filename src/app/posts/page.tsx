// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { canCreatePost, createPost, uploadFile } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Post } from "@/lib/types";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

export default function PostsPage() {
  const [user] = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [canPost, setCanPost] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnap = await getDocs(collection(db, "posts"));
      const postsData = postsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));
    };
    fetchPosts();

    if (user && user.role === "business") {
      canCreatePost(user.id).then((result) => setCanPost(result));
    }
  }, [user]);

  const handleCreatePost = async () => {
    if (!user || user.role !== "business" || !canPost) return;

    setLoading(true);
    try {
      let imageUrl: string | undefined;
      let fileUrl: string | undefined;

      if (image) {
        imageUrl = await uploadFile(image, `posts/images/${Date.now()}_${image.name}`);
      }
      if (file) {
        fileUrl = await uploadFile(file, `posts/files/${Date.now()}_${file.name}`);
      }

      await createPost({
        businessId: user.id,
        content,
        image: imageUrl,
        file: fileUrl,
        link: link || undefined,
      });

      setContent("");
      setImage(null);
      setFile(null);
      setLink("");
      setCanPost(false);
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Du må være logget inn for å se innlegg.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        {user.role === "business" && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Nytt Innlegg</h2>
            {canPost ? (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Hva skjer i bedriften din?"
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="mb-4"
                />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mb-4"
                />
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Legg til en lenke (valgfritt)"
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <button
                  onClick={handleCreatePost}
                  disabled={loading || !content.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {loading ? "Laster opp..." : "Publiser"}
                </button>
              </>
            ) : (
              <p>Du har nådd grensen på 2 innlegg denne uken.</p>
            )}
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6">Alle Innlegg</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
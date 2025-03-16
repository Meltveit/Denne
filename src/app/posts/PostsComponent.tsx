"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { db, canCreatePost, createPost, uploadFile } from "@/lib/firebase";
import { Post } from "@/lib/types";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

interface PostsComponentProps {
  initialPosts: Post[];
}

export default function PostsComponent({ initialPosts }: PostsComponentProps) {
  const [user] = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [canPost, setCanPost] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

      const newPost: Post = {
        id: "", // Vil bli satt av createPost
        businessId: user.id,
        content,
        image: imageUrl,
        file: fileUrl,
        link: link || undefined,
        timestamp: Date.now(),
      };

      const postId = await createPost({
        businessId: user.id,
        content,
        image: imageUrl,
        file: fileUrl,
        link: link || undefined,
      });

      setPosts((prev) => [{ ...newPost, id: postId }, ...prev]);

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

  if (!user) return <div>You must be logged in to view posts.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        {user.role === "business" && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">New Post</h2>
            {canPost ? (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening in your business?"
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
                  placeholder="Add a link (optional)"
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <button
                  onClick={handleCreatePost}
                  disabled={loading || !content.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {loading ? "Uploading..." : "Publish"}
                </button>
              </>
            ) : (
              <p>You have reached the limit of 2 posts this week.</p>
            )}
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6">All Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
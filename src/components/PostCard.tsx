import Link from "next/link";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post image" className="w-full h-40 object-cover mt-2 rounded" />}
      {post.file && (
        <a href={post.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Download file
        </a>
      )}
      {post.link && (
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {post.link}
        </a>
      )}
      <p className="text-gray-500 text-sm mt-2">
        {new Date(post.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
}
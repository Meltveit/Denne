"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import PostCard from "@/components/PostCard";
import { Company, Post } from "@/lib/types";

interface HomeComponentProps {
  companies: Company[];
  posts: Post[];
}

export default function HomeComponent({ companies, posts }: HomeComponentProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto p-6 pt-20 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Companies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <h1 className="text-3xl font-bold mt-12 mb-6">Recent Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Company, Post } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import PostCard from "@/components/PostCard";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Hent bedrifter
        const companiesSnap = await getDocs(collection(db, "businessUsers"));
        const companiesData = companiesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Company[];
        setCompanies(companiesData);

        // Hent innlegg
        const postsSnap = await getDocs(collection(db, "posts"));
        const postsData = postsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto p-6 pt-20 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Bedrifter</h1>
        {loading ? (
          <div>Laster...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold mt-12 mb-6">Siste Innlegg</h1>
        {loading ? (
          <div>Laster...</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
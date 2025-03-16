import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Company, Post } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import AdBanner from "@/components/AdBanner";
import SearchBar from "@/components/SearchBar";
import ToggleViewButton from "@/components/ToggleViewButton";
import Pagination from "@/components/Pagination";

export default async function HomePage() {
  const companiesSnap = await getDocs(collection(db, "businessUsers"));
  const companiesData = companiesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Company[];

  const postsSnap = await getDocs(collection(db, "posts"));
  const postsData = postsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar />
      <main className="max-w-7xl mx-auto p-6 pt-20 flex-grow relative">
        <ToggleViewButton />
        <div className="flex justify-between">
          <AdBanner className="w-[200px] h-[600px] bg-gray-200" />
          <div className="flex-1 mx-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {companiesData.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <AdBanner className="w-[200px] h-[600px] bg-gray-200" />
        </div>
        <Pagination totalItems={companiesData.length} itemsPerPage={20} />
      </main>
      <Footer />
    </div>
  );
}
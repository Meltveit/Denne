// app/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Company } from "@/lib/types";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function MapPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesSnap = await getDocs(collection(db, "businessUsers"));
      const companiesData = companiesSnap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Company))
        .filter((company) => company.lat && company.lng);
      setCompanies(companiesData);
    };
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="h-[80vh] w-full">
        <MapComponent companies={companies} />
      </div>
    </div>
  );
}
"use client";

import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { Company } from "@/lib/types";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

interface MapComponentWrapperProps {
  companies: Company[];
}

export default function MapComponentWrapper({ companies }: MapComponentWrapperProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="h-[80vh] w-full">
        <MapComponent companies={companies} />
      </div>
    </div>
  );
}
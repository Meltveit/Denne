import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Company } from "@/lib/types";
import MapComponentWrapper from "./MapComponentWrapper";

// Hent data direkte i Server Component
export default async function MapPage() {
  const companiesSnap = await getDocs(collection(db, "businessUsers"));
  const companiesData = companiesSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Company))
    .filter((company) => company.lat && company.lng);

  return <MapComponentWrapper companies={companiesData} />;
}
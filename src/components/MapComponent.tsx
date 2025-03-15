// components/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Company } from "@/lib/types";
import Link from "next/link";

interface MapComponentProps {
  companies: Company[];
}

export default function MapComponent({ companies }: MapComponentProps) {
  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {companies.map((company) => (
        <Marker key={company.id} position={[company.lat!, company.lng!]}>
          <Popup>
            <Link href={`/business/${company.id}`}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
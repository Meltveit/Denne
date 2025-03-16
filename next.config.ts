import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Eksporterer til statiske filer i "out"-mappen
  images: {
    unoptimized: true, // Deaktiverer Image Optimization for statisk hosting
  },
  // Valgfritt: Legg til basePath eller assetPrefix hvis du hoster i en subdirectory
  // basePath: "/subdirectory", // Fjern kommentar og sett hvis nødvendig
  // assetPrefix: "/subdirectory/", // Fjern kommentar og sett hvis nødvendig
};

export default nextConfig;
"use client";

import { useState, useEffect } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-16 w-full max-w-7xl mx-auto p-4 bg-white shadow-md z-10 transition-transform ${scrollY > 0 ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search companies..."
          className="p-2 border rounded-lg w-full"
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg">Map</button>
        <button className="p-2 bg-blue-500 text-white rounded-lg">Filter</button>
      </div>
    </div>
  );
}
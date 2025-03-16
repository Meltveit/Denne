"use client";

import { useState } from "react";

export default function ToggleViewButton() {
  const [view, setView] = useState("companies");

  return (
    <button
      onClick={() => setView(view === "companies" ? "news" : "companies")}
      className="mb-4 p-2 bg-blue-500 text-white rounded-lg"
    >
      Switch to {view === "companies" ? "News" : "Companies"}
    </button>
  );
}
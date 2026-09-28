"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header>
      <div className="htop">
        <div className="brand">
          Shop<span className="fk-dot">•</span>Link365
        </div>
        <div className="htop-icons">
          <span className="streak-badge">🔥 3</span>
          <span>🔔</span>
          <span>♡</span>
        </div>
      </div>
      <div className="search-bar-wrap">
        <input
          className="search-input"
          placeholder="🔍 Try searching 'wireless drill'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-go" onClick={handleSearch}>
          Go
        </button>
      </div>
    </header>
  );
}

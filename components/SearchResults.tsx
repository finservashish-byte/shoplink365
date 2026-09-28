"use client";

import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/sanity/queries";
import ProductGrid from "@/components/ProductGrid";

export default function SearchResults({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const matches = q
    ? products.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q)
      )
    : products;

  if (!q) {
    return (
      <div className="section-block">
        <p style={{ fontSize: 12.5, color: "#666" }}>Type something in the search bar above to find a product.</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="section-block">
        <div className="no-match-msg">
          <div className="no-match-icon">🔍</div>
          <p>
            <strong>No exact match for &quot;{searchParams.get("q")}&quot;</strong>
            <br />
            Try a broader term, or browse categories from the home page.
          </p>
        </div>
      </div>
    );
  }

  // ProductGrid renders its own section header ("Trending Now") — fine for now since
  // it still shows the right filtered products; rename it to something search-specific
  // later if this page gets its own dedicated layout.
  return <ProductGrid products={matches} />;
}

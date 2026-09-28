"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/sanity/queries";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistClient({ products }: { products: Product[] }) {
  const [saved, setSaved] = useState<Product[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const wishlisted = products.filter((p) => localStorage.getItem(`sl365_wishlist_${p._id}`) === "1");
    setSaved(wishlisted);
    setChecked(true);
  }, [products]);

  if (!checked) return null;

  if (saved.length === 0) {
    return (
      <div className="section-block">
        <div className="no-match-msg">
          <div className="no-match-icon">♡</div>
          <p>
            Nothing saved yet — tap the heart icon on any product card to add it here.
          </p>
        </div>
      </div>
    );
  }

  return <ProductGrid products={saved} />;
}

"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

const GRADIENTS = [
  "linear-gradient(155deg,#FFE0B2,#FFB74D)",
  "linear-gradient(155deg,#C8E6C9,#81C784)",
  "linear-gradient(155deg,#B3E5FC,#4FC3F7)",
  "linear-gradient(155deg,#E1BEE7,#BA68C8)",
];

function discountPercent(price: number, wasPrice?: number) {
  if (!wasPrice || wasPrice <= price) return null;
  return Math.round(((wasPrice - price) / wasPrice) * 100);
}

function WishlistButton({ productId }: { productId: string }) {
  const [active, setActive] = useState(false);
  const key = `sl365_wishlist_${productId}`;

  useEffect(() => {
    setActive(localStorage.getItem(key) === "1");
  }, [key]);

  return (
    <button
      className={`wishlist-btn${active ? " active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        const next = !active;
        setActive(next);
        localStorage.setItem(key, next ? "1" : "0");
      }}
      aria-label="Toggle wishlist"
    >
      {active ? "♥" : "♡"}
    </button>
  );
}

function WhatsAppButton({ product }: { product: Product }) {
  const offer = product.offers?.[0];
  return (
    <button
      className="whatsapp-btn"
      onClick={(e) => {
        e.preventDefault();
        const price = offer ? `₹${offer.price}` : "";
        const text = encodeURIComponent(
          `Check this out: ${product.nameEn}${price ? " - " + price : ""} via ShopLink365 👉 https://shoplink365.com/reviews/${product.slug.current}`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
      }}
      aria-label="Share on WhatsApp"
    >
      📱
    </button>
  );
}

function AlertButton() {
  return (
    <button
      className="alert-btn"
      title="Notify me on price drop"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alert("You'll be notified here + can join our WhatsApp channel for price drop alerts.");
      }}
    >
      🔔
    </button>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Trending");

  const platforms = Array.from(
    new Set(products.flatMap((p) => p.offers.map((o) => o.platform?.name).filter(Boolean)))
  );

  let filtered =
    filter === "All" ? products : products.filter((p) => p.offers.some((o) => o.platform?.name === filter));

  filtered = [...filtered].sort((a, b) => {
    const aOffer = a.offers[0];
    const bOffer = b.offers[0];
    if (sort === "Price: Low to High") return (aOffer?.price ?? 0) - (bOffer?.price ?? 0);
    if (sort === "Price: High to Low") return (bOffer?.price ?? 0) - (aOffer?.price ?? 0);
    if (sort === "Highest Discount") {
      const aD = discountPercent(aOffer?.price ?? 0, aOffer?.wasPrice) ?? 0;
      const bD = discountPercent(bOffer?.price ?? 0, bOffer?.wasPrice) ?? 0;
      return bD - aD;
    }
    return 0; // Trending: keep Sanity's order (trending desc, newest first)
  });

  useEffect(() => {
    // Record most recently viewed product for the "Recently Viewed" rail (real localStorage, no backend)
    if (products[0]) {
      let recent: string[] = JSON.parse(localStorage.getItem("sl365_recent") || "[]");
      if (!recent.includes(products[0].nameEn)) {
        recent = [products[0].nameEn, ...recent].slice(0, 5);
        localStorage.setItem("sl365_recent", JSON.stringify(recent));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="section-block glass-zone">
      <div className="section-head">
        <h3>🔥 Trending Now</h3>
        <a href="/reviews">See All</a>
      </div>

      {platforms.length > 0 && (
        <div className="filter-chips">
          <button className={`fchip${filter === "All" ? " active" : ""}`} onClick={() => setFilter("All")}>
            All
          </button>
          {platforms.map((p) => (
            <button
              key={p}
              className={`fchip${filter === p ? " active" : ""}`}
              onClick={() => setFilter(p as string)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="sort-row">
        <span>Sort:</span>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Trending</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Discount</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product, i) => {
          const offer = product.offers?.[0];
          const discount = offer ? discountPercent(offer.price, offer.wasPrice) : null;
          const hasImage = product.images && product.images.length > 0;
          const imageUrl = hasImage ? urlFor(product.images![0]).width(400).height(400).url() : null;
          return (
            <a key={product._id} className="pcard" href={`/reviews/${product.slug.current}`}>
              <div
                className="photo"
                style={
                  imageUrl
                    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: GRADIENTS[i % GRADIENTS.length] }
                }
              >
                {offer?.platform && (
                  <span
                    className="platform-tag"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(offer.affiliateLink, "_blank");
                    }}
                  >
                    <span className="dot" style={{ background: offer.platform.color }} />
                    {offer.platform.name}
                    <span className="chevron">▸</span>
                  </span>
                )}
                <WishlistButton productId={product._id} />
                <AlertButton />
                <WhatsAppButton product={product} />
              </div>
              <div className="info">
                <h4>{product.nameEn}</h4>
                <div className="price-row">
                  {offer && <span className="price">₹{offer.price.toLocaleString("en-IN")}</span>}
                  {offer?.wasPrice && <span className="mrp">₹{offer.wasPrice.toLocaleString("en-IN")}</span>}
                  {discount && <span className="discount">{discount}% off</span>}
                </div>
                {product.rating && (
                  <div className="rating-row">
                    <span className="rating-badge">{product.rating.toFixed(1)} ★</span>
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

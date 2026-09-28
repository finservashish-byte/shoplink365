"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

function discountPercent(price: number, wasPrice?: number) {
  if (!wasPrice || wasPrice <= price) return null;
  return Math.round(((wasPrice - price) / wasPrice) * 100);
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const key = `sl365_wishlist_${product._id}`;

  useEffect(() => {
    setWishlisted(localStorage.getItem(key) === "1");
  }, [key]);

  function toggleWishlist() {
    const next = !wishlisted;
    setWishlisted(next);
    localStorage.setItem(key, next ? "1" : "0");
  }

  function shareOnWhatsApp(offer: Product["offers"][number]) {
    const text = encodeURIComponent(
      `Check this out: ${product.nameEn} - ₹${offer.price} via ShopLink365 👉 https://shoplink365.com/reviews/${product.slug.current}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  const hasImage = product.images && product.images.length > 0;
  const imageUrl = hasImage ? urlFor(product.images![0]).width(800).height(600).url() : null;

  return (
    <div className="detail-page">
      <div
        className={imageUrl ? "detail-photo" : "detail-photo g1"}
        style={
          imageUrl
            ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        <button className={`wishlist-btn detail-wishlist${wishlisted ? " active" : ""}`} onClick={toggleWishlist}>
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="detail-body">
        {product.category && <div className="detail-category">{product.category.icon} {product.category.name}</div>}
        <h1 className="detail-title">{product.nameEn}</h1>
        {product.tagline && <p className="detail-tagline">{product.tagline}</p>}

        {product.rating && (
          <div className="rating-row" style={{ margin: "8px 0" }}>
            <span className="rating-badge">{product.rating.toFixed(1)} ★</span>
          </div>
        )}

        <div className="detail-offers">
          <h3 className="detail-section-title">Compare across stores</h3>
          {product.offers.map((offer) => {
            const discount = discountPercent(offer.price, offer.wasPrice);
            return (
              <div className="detail-offer-row" key={offer._key}>
                <span className="cdot" style={{ background: offer.platform.color }} />
                <span className="detail-offer-platform">{offer.platform.name}</span>
                <span className="detail-offer-price">
                  ₹{offer.price.toLocaleString("en-IN")}
                  {offer.wasPrice && <span className="mrp"> ₹{offer.wasPrice.toLocaleString("en-IN")}</span>}
                  {discount && <span className="discount"> {discount}% off</span>}
                </span>
                <a className="cgo" href={offer.affiliateLink} target="_blank" rel="noopener noreferrer sponsored">
                  Buy →
                </a>
                <button className="sim-whatsapp detail-share" onClick={() => shareOnWhatsApp(offer)}>
                  📱
                </button>
              </div>
            );
          })}
        </div>

        {(product.pros?.length || product.cons?.length) ? (
          <div className="detail-proscons">
            {product.pros && product.pros.length > 0 && (
              <div>
                <h3 className="detail-section-title">Pros</h3>
                <ul className="detail-list detail-list-pros">
                  {product.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.cons && product.cons.length > 0 && (
              <div>
                <h3 className="detail-section-title">Cons</h3>
                <ul className="detail-list detail-list-cons">
                  {product.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

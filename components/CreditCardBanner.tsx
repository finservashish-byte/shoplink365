import type { FeaturedOffer } from "@/lib/sanity/queries";

export default function CreditCardBanner({ offer }: { offer: FeaturedOffer | undefined }) {
  if (!offer) return null;
  return (
    <a className="cc-banner-rich" href={offer.applyLink} target="_blank" rel="noopener noreferrer sponsored">
      {offer.trendingBadge && <span className="cc-trending-badge">🔥 TRENDING</span>}
      <div className="cc-rich-content">
        <h3>{offer.title}</h3>
        <ul className="cc-benefit-list">
          {offer.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <span className="cc-rich-apply">Apply Now →</span>
      </div>
      <div className="cc-rich-visual">{offer.icon}</div>
    </a>
  );
}

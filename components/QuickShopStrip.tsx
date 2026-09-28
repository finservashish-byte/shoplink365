import type { Platform } from "@/lib/sanity/queries";

const PLATFORM_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  Amazon: { bg: "#FFF3E0", text: "#E65100", icon: "🛒" },
  Flipkart: { bg: "#E3F2FD", text: "#1A4FBF", icon: "🛍️" },
  Myntra: { bg: "#FCE4EC", text: "#C2185B", icon: "👗" },
  Meesho: { bg: "#F3E5F5", text: "#6A1B9A", icon: "📦" },
};

export default function QuickShopStrip({ platforms }: { platforms: Platform[] }) {
  if (platforms.length === 0) return null;
  return (
    <div className="quick-shop">
      {platforms.map((p) => {
        const style = PLATFORM_STYLES[p.name] || { bg: "#F3E5F5", text: p.color, icon: "🛍️" };
        return (
          <a
            key={p._id}
            className="qs-chip"
            href={p.storefrontUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ background: style.bg, color: style.text }}
          >
            {style.icon} {p.name}
          </a>
        );
      })}
    </div>
  );
}

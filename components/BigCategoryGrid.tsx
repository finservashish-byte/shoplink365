import Link from "next/link";
import type { Category } from "@/lib/sanity/queries";

export default function BigCategoryGrid({ categories, limit = 4 }: { categories: Category[]; limit?: number }) {
  if (categories.length === 0) return null;
  return (
    <div className="big-cat-grid">
      {categories.slice(0, limit).map((c) => (
        <Link key={c._id} className="big-cat-tile" href={`/category/${c._id}`} style={{ background: c.color }}>
          <h3>{c.name}</h3>
          <span className="big-cat-icon">{c.icon}</span>
        </Link>
      ))}
    </div>
  );
}

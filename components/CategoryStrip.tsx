import Link from "next/link";
import type { Category } from "@/lib/sanity/queries";

const CIRCLE_COLORS = ["#FFF3E0", "#E8F5E9", "#E3F2FD", "#FCE4EC", "#EDE7F6", "#FFF9C4"];

export default function CategoryStrip({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;
  return (
    <div className="cat-strip">
      {categories.map((c, i) => (
        <Link key={c._id} className="cat-item" href={`/category/${c._id}`}>
          <div className="cat-circle" style={{ background: CIRCLE_COLORS[i % CIRCLE_COLORS.length] }}>
            {c.icon}
          </div>
          <span>{c.name}</span>
        </Link>
      ))}
    </div>
  );
}

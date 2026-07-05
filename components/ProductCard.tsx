import Link from "next/link";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/reviews/${product.slug}`}
      className="glass-tile flex flex-col p-5 hover:border-brass/50 transition-colors"
    >
      <div className="aspect-[4/3] w-full bg-[#EEE8DB] mb-4 flex items-center justify-center">
        <span className="text-grey text-xs uppercase tracking-widest">
          Product Photo
        </span>
      </div>
      <span className="text-xs font-bold uppercase tracking-wide text-brass mb-1">
        {product.category}
      </span>
      <h3 className="font-display text-lg text-ink mb-1 leading-snug">
        {product.nameEn}
      </h3>
      <p className="text-sm text-grey mb-3">{product.tagline}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-ink">₹{product.price}</span>
        <span className="text-xs text-brass font-bold uppercase tracking-wide">
          Read Review →
        </span>
      </div>
    </Link>
  );
}

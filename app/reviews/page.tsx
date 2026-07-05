import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

export default function ReviewsPage() {
  return (
    <div className="px-5 md:px-16 pb-24 md:pb-16 pt-10">
      <span className="text-xs font-bold uppercase tracking-wide text-brass">
        All Reviews
      </span>
      <h1 className="font-display text-3xl md:text-4xl mt-2 mb-8">
        Every product we&apos;ve tested
      </h1>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
        <button className="px-4 py-2 border border-ink bg-ink text-paper-lift text-xs font-bold uppercase tracking-wide whitespace-nowrap">
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 border border-grey/40 text-xs font-bold uppercase tracking-wide whitespace-nowrap hover:border-brass hover:text-brass transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

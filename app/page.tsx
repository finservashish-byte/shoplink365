import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

export default function Home() {
  const featured = products[0];
  const rest = products.slice(1);

  return (
    <div className="px-5 md:px-16 pb-24 md:pb-16">
      {/* Hero */}
      <section className="pt-12 pb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brass">
          Honest Reviews, No Fluff
        </span>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mt-3 mb-4 max-w-2xl">
          Products worth your money — tested, not sponsored.
        </h1>
        <p className="text-grey text-lg max-w-xl mb-8">
          ShopLink365 reviews kitchen, grooming, books, and home & living
          products for Indian shoppers — in English and Hindi, with real
          pros and cons.
        </p>
        <div className="flex gap-3">
          <Link
            href="/reviews"
            className="bg-brass text-paper-lift px-7 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brass-deep transition-colors"
          >
            Browse Reviews
          </Link>
          <Link
            href="/guides"
            className="border border-ink px-7 py-3 text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-paper-lift transition-colors"
          >
            Buying Guides
          </Link>
        </div>
      </section>

      <div className="double-divider my-10" />

      {/* Category chips */}
      <section className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/reviews?category=${encodeURIComponent(cat)}`}
            className="px-4 py-2 border border-grey/40 text-xs font-bold uppercase tracking-wide whitespace-nowrap hover:border-brass hover:text-brass transition-colors"
          >
            {cat}
          </Link>
        ))}
      </section>

      {/* Featured review */}
      <section className="mb-14">
        <span className="text-xs font-bold uppercase tracking-wide text-brass">
          Editor&apos;s Pick
        </span>
        <div className="glass-tile mt-4 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5 aspect-[4/3] bg-[#EEE8DB] flex items-center justify-center">
            <span className="text-grey text-xs uppercase tracking-widest">
              Product Photo
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase text-brass mb-2">
              {featured.category}
            </span>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              {featured.nameEn}
            </h2>
            <p className="text-grey mb-6">{featured.tagline}</p>
            <Link
              href={`/reviews/${featured.slug}`}
              className="self-start border border-ink px-6 py-3 text-xs font-bold uppercase tracking-wide hover:bg-ink hover:text-paper-lift transition-colors"
            >
              Read Full Review
            </Link>
          </div>
        </div>
      </section>

      {/* Recent reviews grid */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Recent Reviews</h2>
          <Link href="/reviews" className="text-xs font-bold uppercase text-brass">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {rest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div className="double-divider my-10" />

      {/* Newsletter */}
      <section className="max-w-lg mx-auto text-center py-10">
        <h3 className="font-display text-2xl mb-3">Get the Weekly Roundup</h3>
        <p className="text-grey mb-6 text-sm">
          Honest reviews and buying guides, delivered once a week. No spam.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end justify-center">
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full sm:w-72 border-b border-ink bg-transparent py-2 focus:outline-none"
          />
          <button className="bg-ink text-paper-lift px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brass transition-colors">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

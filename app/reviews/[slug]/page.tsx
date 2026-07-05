import { notFound } from "next/navigation";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div className="px-5 md:px-16 pb-24 md:pb-16 pt-10">
      <span className="text-xs font-bold uppercase tracking-wide text-brass">
        {product.category} · Review
      </span>
      <h1 className="font-display text-3xl md:text-4xl mt-2 mb-4 max-w-2xl">
        {product.nameEn}
      </h1>
      <p className="text-grey mb-2">{product.nameHi}</p>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-bold text-lg">₹{product.price}</span>
        <span className="text-brass font-bold">★ {product.rating}</span>
      </div>

      <div className="aspect-[16/10] w-full bg-[#EEE8DB] mb-10 flex items-center justify-center">
        <span className="text-grey text-xs uppercase tracking-widest">
          Product Photo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="glass-tile p-6">
          <h2 className="font-display text-xl mb-4 text-brass-deep">Pros</h2>
          <ul className="space-y-2">
            {product.pros.map((pro) => (
              <li key={pro} className="flex gap-2 text-sm">
                <span className="text-brass">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-tile p-6">
          <h2 className="font-display text-xl mb-4 text-grey">Cons</h2>
          <ul className="space-y-2">
            {product.cons.map((con) => (
              <li key={con} className="flex gap-2 text-sm">
                <span className="text-grey">−</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="double-divider mb-10" />

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <a
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 text-center bg-brass text-paper-lift px-6 py-4 text-sm font-bold uppercase tracking-wide hover:bg-brass-deep transition-colors"
        >
          Buy on Amazon
        </a>
        {product.flipkartLink && (
          <a
            href={product.flipkartLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 text-center border border-ink px-6 py-4 text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-paper-lift transition-colors"
          >
            Buy on Flipkart
          </a>
        )}
      </div>

      <p className="text-xs text-grey/70 uppercase tracking-widest">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    </div>
  );
}

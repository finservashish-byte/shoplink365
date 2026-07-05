import { products } from "@/lib/products";

export default function ComparePage() {
  const compareSet = products;

  return (
    <div className="px-5 md:px-16 pb-24 md:pb-16 pt-10">
      <span className="text-xs font-bold uppercase tracking-wide text-brass">
        Comparison
      </span>
      <h1 className="font-display text-3xl md:text-4xl mt-2 mb-3 max-w-2xl">
        Kitchen Essentials — Side by Side
      </h1>
      <p className="text-grey max-w-xl mb-8">
        A direct comparison across price, rating, and standout feature so you
        can decide in seconds.
      </p>

      <div className="overflow-x-auto no-scrollbar -mx-5 px-5">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left p-4 border-b border-grey/30 w-40 align-bottom">
                <span className="text-xs font-bold uppercase text-grey">
                  Metric
                </span>
              </th>
              {compareSet.map((p) => (
                <th key={p.id} className="p-4 border-b border-grey/30 min-w-[220px] text-left">
                  <div className="aspect-[4/3] w-full bg-[#EEE8DB] mb-3 flex items-center justify-center">
                    <span className="text-grey text-[10px] uppercase tracking-widest">
                      Photo
                    </span>
                  </div>
                  <span className="font-display text-base">{p.nameEn}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-grey/15 text-xs font-bold uppercase text-grey">
                Price
              </td>
              {compareSet.map((p) => (
                <td key={p.id} className="p-4 border-b border-grey/15 font-bold">
                  ₹{p.price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-grey/15 text-xs font-bold uppercase text-grey">
                Rating
              </td>
              {compareSet.map((p) => (
                <td key={p.id} className="p-4 border-b border-grey/15 text-brass font-bold">
                  ★ {p.rating}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-b border-grey/15 text-xs font-bold uppercase text-grey">
                Best For
              </td>
              {compareSet.map((p) => (
                <td key={p.id} className="p-4 border-b border-grey/15 text-sm text-grey">
                  {p.tagline}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-xs font-bold uppercase text-grey"></td>
              {compareSet.map((p) => (
                <td key={p.id} className="p-4">
                  <a
                    href={p.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block text-center bg-brass text-paper-lift px-4 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brass-deep transition-colors"
                  >
                    View Deal
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

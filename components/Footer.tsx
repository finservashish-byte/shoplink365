export default function Footer() {
  return (
    <footer className="bg-[#EEE8DB] border-t border-grey/20 mt-20 pb-24 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full px-5 md:px-16 py-16 max-w-[1120px] mx-auto">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">
            ShopLink<span className="text-brass">365</span>
          </h2>
          <p className="text-grey max-w-md mb-6 text-sm leading-relaxed">
            Honest, unbiased product reviews for Indian shoppers. Kitchen,
            grooming, books, and home & living — tested and reviewed in both
            English and Hindi.
          </p>
        </div>
        <div className="flex flex-col md:items-end justify-between">
          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase opacity-50 mb-1">
                Explore
              </span>
              <a href="/reviews" className="text-grey hover:text-brass">
                Reviews
              </a>
              <a href="/guides" className="text-grey hover:text-brass">
                Buying Guides
              </a>
              <a href="/compare" className="text-grey hover:text-brass">
                Comparisons
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase opacity-50 mb-1">
                Legal
              </span>
              <a href="/privacy" className="text-grey hover:text-brass">
                Privacy Policy
              </a>
              <a href="/disclosure" className="text-grey hover:text-brass">
                Affiliate Disclosure
              </a>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-grey mb-1">
              © 2026 ShopLink365. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-grey/70">
              As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

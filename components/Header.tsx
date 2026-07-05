import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-paper-lift/90 backdrop-blur border-b border-grey/20 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 max-w-[1120px] mx-auto">
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl text-ink tracking-tight"
        >
          ShopLink<span className="text-brass">365</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
          <Link href="/reviews" className="text-grey hover:text-brass transition-colors">
            Reviews
          </Link>
          <Link href="/guides" className="text-grey hover:text-brass transition-colors">
            Guides
          </Link>
          <Link href="/compare" className="text-grey hover:text-brass transition-colors">
            Compare
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            aria-label="Switch language"
            className="text-xs font-bold uppercase border border-ink/30 px-3 py-1.5 tracking-wide hover:bg-ink hover:text-paper-lift transition-colors"
          >
            EN / हिं
          </button>
        </div>
      </div>
    </header>
  );
}

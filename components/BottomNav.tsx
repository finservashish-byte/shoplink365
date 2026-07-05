"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/guides", label: "Guides", icon: CompassIcon },
  { href: "/compare", label: "Compare", icon: ScaleIcon },
  { href: "/saved", label: "Saved", icon: BookmarkIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-3 pb-3">
      <div className="glass-tile flex justify-around items-center rounded-2xl px-2 py-2 shadow-[0_4px_24px_rgba(27,27,24,0.08)]">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                active ? "text-brass" : "text-grey"
              }`}
            >
              <Icon active={active} />
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11.5L12 4l8 7.5V20a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8.5z"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CompassIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
      <path d="M14.5 9.5L13 13l-3.5 1.5L11 11l3.5-1.5z" stroke="currentColor" strokeWidth={active ? 2 : 1.4} strokeLinejoin="round" />
    </svg>
  );
}
function ScaleIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M6 7h12M4 7l3 6a3 3 0 006 0l3-6M4 7h3M17 7h3" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinejoin="round" />
    </svg>
  );
}

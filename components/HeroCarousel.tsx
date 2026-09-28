"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/lib/sanity/queries";

// Fallback slides so the hero never looks empty before real HeroSlide docs are added in Sanity.
const FALLBACK_SLIDES: (HeroSlide & { _fallback: true })[] = [
  {
    _id: "fallback-1",
    _fallback: true,
    platform: { name: "Amazon", color: "#FF9900" },
    badge: "🔴 Live Now · Amazon",
    headline: "Up to 40% Off",
    subtext: "Kitchen Essentials — ends tonight",
    ctaLabel: "Shop Amazon Sale →",
    ctaLink: "https://amzn.to/47ouGT3",
    backgroundColor: "linear-gradient(135deg,#FF9900,#E65100)",
    displayOrder: 1,
  },
  {
    _id: "fallback-2",
    _fallback: true,
    platform: { name: "Flipkart", color: "#2874F0" },
    badge: "🔵 Big Billion Days · Flipkart",
    headline: "Up to 85% Off",
    subtext: "Across Categories — early access live",
    ctaLabel: "Shop Flipkart Sale →",
    ctaLink: "https://fktr.in/0LTJaSM",
    backgroundColor: "linear-gradient(135deg,#2874F0,#0D2B6B)",
    displayOrder: 2,
  },
  {
    _id: "fallback-3",
    _fallback: true,
    platform: { name: "Myntra", color: "#E11D74" },
    badge: "🌸 End of Season · Myntra",
    headline: "50-90% Off",
    subtext: "Across all fashion categories",
    ctaLabel: "Shop Myntra Sale →",
    ctaLink: "https://myntr.it/jNnOY8D",
    backgroundColor: "linear-gradient(135deg,#E11D74,#7A1550)",
    displayOrder: 3,
  },
  {
    _id: "fallback-4",
    _fallback: true,
    platform: { name: "Meesho", color: "#7A2E8C" },
    badge: "📦 Steal Deals · Meesho",
    headline: "Starting ₹99",
    subtext: "Home & Living essentials",
    ctaLabel: "Shop Meesho Sale →",
    ctaLink: "https://bitli.in/6m3FsEP",
    backgroundColor: "linear-gradient(135deg,#7A2E8C,#3D1747)",
    displayOrder: 4,
  },
];

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const data = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % data.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [data.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
  }, [idx]);

  return (
    <div className="hero-carousel-wrap">
      <div className="hero-carousel" ref={trackRef}>
        {data.map((slide) => (
          <div key={slide._id} className="hero-slide" style={{ background: slide.backgroundColor }}>
            <span className="hero-badge">{slide.badge}</span>
            <h2>{slide.headline}</h2>
            <p>{slide.subtext}</p>
            <a className="hero-cta" href={slide.ctaLink} target="_blank" rel="noopener noreferrer sponsored">
              {slide.ctaLabel}
            </a>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {data.map((slide, i) => (
          <span key={slide._id} className={i === idx ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}

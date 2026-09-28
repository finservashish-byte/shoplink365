import Header from "@/components/Header";
import QuickShopStrip from "@/components/QuickShopStrip";
import CategoryStrip from "@/components/CategoryStrip";
import BigCategoryGrid from "@/components/BigCategoryGrid";
import MiniEarnBar from "@/components/MiniEarnBar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import CreditCardBanner from "@/components/CreditCardBanner";
import GuidesRail from "@/components/GuidesRail";
import BottomNav from "@/components/BottomNav";
import ScratchCard from "@/components/ScratchCard";
import {
  getPlatforms,
  getCategories,
  getTrendingProducts,
  getHeroSlides,
  getFeaturedOffers,
  getScratchCardOffer,
  getGuides,
} from "@/lib/sanity/queries";

// Static export: this page (and its Sanity data) is fetched once at BUILD time,
// not on every visit. Re-run the GitHub Actions build to pull in new Sanity content.
export const dynamic = "force-static";

export default async function HomePage() {
  const [platforms, categories, products, heroSlides, featuredOffers, scratchOffer, guides] = await Promise.all([
    getPlatforms(),
    getCategories(),
    getTrendingProducts(),
    getHeroSlides(),
    getFeaturedOffers(),
    getScratchCardOffer(),
    getGuides(),
  ]);

  const creditCardOffer = featuredOffers.find((o) => o.offerType === "Credit Card");

  return (
    <>
      <ScratchCard offer={scratchOffer} />
      <Header />
      <QuickShopStrip platforms={platforms} />
      <CategoryStrip categories={categories} />
      <BigCategoryGrid categories={categories} />
      <MiniEarnBar />
      <HeroCarousel slides={heroSlides} />
      <ProductGrid products={products} />
      <CreditCardBanner offer={creditCardOffer} />
      <GuidesRail guides={guides} />
      <BottomNav />
    </>
  );
}

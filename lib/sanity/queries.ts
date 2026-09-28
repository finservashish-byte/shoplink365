import { client } from "./client";

export type Platform = {
  _id: string;
  name: string;
  storefrontUrl: string;
  color: string;
  active: boolean;
};

export type Category = {
  _id: string;
  name: string;
  icon: string;
  color: string;
  displayOrder: number;
  active: boolean;
};

export type Offer = {
  _key: string;
  platform: { name: string; color: string };
  price: number;
  wasPrice?: number;
  affiliateLink: string;
  inStock: boolean;
  dealType?: string;
};

export type Product = {
  _id: string;
  nameEn: string;
  slug: { current: string };
  category: { name: string; icon: string };
  tagline?: string;
  rating?: number;
  images?: any[];
  offers: Offer[];
  saves?: number;
  trending?: boolean;
  stamp?: string;
};

export type HeroSlide = {
  _id: string;
  platform: { name: string; color: string };
  badge: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
  backgroundColor: string;
  displayOrder: number;
};

export type FeaturedOffer = {
  _id: string;
  offerType: string;
  title: string;
  trendingBadge?: boolean;
  benefits: string[];
  applyLink: string;
  icon: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  postType: string;
  excerpt?: string;
};

// Fall back to [] rather than throwing when Sanity has no data yet or is unreachable at build time.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const result = await client.fetch<T>(query);
    return result ?? fallback;
  } catch (err) {
    console.warn("Sanity fetch failed, using fallback:", err);
    return fallback;
  }
}

export const getPlatforms = () =>
  safeFetch<Platform[]>(
    `*[_type == "platform" && active == true] | order(name asc)`,
    []
  );

export const getCategories = () =>
  safeFetch<Category[]>(
    `*[_type == "category" && active == true] | order(displayOrder asc)`,
    []
  );

export const getTrendingProducts = () =>
  safeFetch<Product[]>(
    `*[_type == "product" && contentStatus == "published"] | order(trending desc, _createdAt desc)[0...12]{
      _id, nameEn, slug, rating, saves, trending, stamp,
      category->{name, icon},
      images,
      offers[]{
        _key, price, wasPrice, affiliateLink, inStock, dealType,
        platform->{name, color}
      }
    }`,
    []
  );

export const getHeroSlides = () =>
  safeFetch<HeroSlide[]>(
    `*[_type == "heroSlide" && active == true] | order(displayOrder asc){
      _id, badge, headline, subtext, ctaLabel, ctaLink, backgroundColor, displayOrder,
      platform->{name, color}
    }`,
    []
  );

export const getFeaturedOffers = () =>
  safeFetch<FeaturedOffer[]>(
    `*[_type == "featuredOffer" && active == true] | order(_createdAt desc)`,
    []
  );

export const getScratchCardOffer = () =>
  safeFetch<FeaturedOffer | null>(
    `*[_type == "featuredOffer" && active == true && showInScratchCard == true][0]`,
    null
  );

export const getGuides = () =>
  safeFetch<BlogPost[]>(
    `*[_type == "blogPost" && status == "published"] | order(publishDate desc)[0...6]{
      _id, title, slug, postType, excerpt
    }`,
    []
  );

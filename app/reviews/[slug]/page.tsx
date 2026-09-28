import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getAllProducts, getProductBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found — ShopLink365" };
  const offer = product.offers?.[0];
  return {
    title: `${product.nameEn} — Price, Review & Best Deal | ShopLink365`,
    description:
      product.tagline ||
      `Compare prices for ${product.nameEn} across Amazon, Flipkart, Myntra and Meesho.${
        offer ? ` Best price: ₹${offer.price}.` : ""
      }`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const offer = product.offers?.[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameEn,
    description: product.tagline,
    ...(product.rating && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: 1 },
    }),
    ...(offer && {
      offers: {
        "@type": "Offer",
        price: offer.price,
        priceCurrency: "INR",
        availability: offer.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: offer.affiliateLink,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <ProductDetailClient product={product} />
      <BottomNav />
    </>
  );
}

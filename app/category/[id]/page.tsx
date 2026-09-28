import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import { getCategories, getCategoryById, getProductsByCategory } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ id: c._id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) return { title: "Category not found — ShopLink365" };
  return {
    title: `${category.name} — Best Deals & Picks | ShopLink365`,
    description: `Compare the best ${category.name} deals across Amazon, Flipkart, Myntra and Meesho.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();
  const products = await getProductsByCategory(id);

  return (
    <>
      <Header />
      <div className="section-block">
        <div className="section-head">
          <h3>
            {category.icon} {category.name}
          </h3>
        </div>
      </div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="section-block">
          <p style={{ fontSize: 12.5, color: "#666" }}>No products added in this category yet — check back soon.</p>
        </div>
      )}
      <BottomNav />
    </>
  );
}

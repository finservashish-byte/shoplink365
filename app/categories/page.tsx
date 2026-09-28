import Header from "@/components/Header";
import BigCategoryGrid from "@/components/BigCategoryGrid";
import BottomNav from "@/components/BottomNav";
import { getCategories } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export const metadata = {
  title: "All Categories | ShopLink365",
  description: "Browse all categories on ShopLink365.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Header />
      <div className="section-block">
        <div className="section-head">
          <h3>All Categories</h3>
        </div>
      </div>
      <BigCategoryGrid categories={categories} limit={categories.length} />
      <BottomNav />
    </>
  );
}

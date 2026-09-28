import { Suspense } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SearchResults from "@/components/SearchResults";
import { getAllProducts } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export const metadata = {
  title: "Search — ShopLink365",
  description: "Search and compare products across Amazon, Flipkart, Myntra and Meesho.",
};

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <SearchResults products={products} />
      </Suspense>
      <BottomNav />
    </>
  );
}

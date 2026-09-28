import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WishlistClient from "@/components/WishlistClient";
import { getAllProducts } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export const metadata = {
  title: "My Wishlist | ShopLink365",
  description: "Products you've saved on ShopLink365.",
};

export default async function WishlistPage() {
  const products = await getAllProducts();
  return (
    <>
      <Header />
      <WishlistClient products={products} />
      <BottomNav />
    </>
  );
}

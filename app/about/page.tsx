import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-static";

export const metadata = {
  title: "About Us | ShopLink365",
  description: "ShopLink365 compares deals across Amazon, Flipkart, Myntra and Meesho so you can shop the best price, every time.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="section-block">
        <h1 className="detail-title">About ShopLink365</h1>
        <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, marginTop: 10 }}>
          ShopLink365 helps you find the best deal on a product across India&apos;s top shopping sites — Amazon,
          Flipkart, Myntra and Meesho — in one place. We link out to each platform&apos;s official store, so
          every purchase you make still qualifies you for that platform&apos;s own offers, warranty and returns
          policy.
        </p>
        <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, marginTop: 10 }}>
          As an Amazon Associate and affiliate partner of other platforms, we earn a small commission on
          qualifying purchases made through our links — at no extra cost to you. This doesn&apos;t affect which
          products we feature or how we price-compare them.
        </p>
      </div>
      <BottomNav />
    </>
  );
}

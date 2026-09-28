import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getAllGuides } from "@/lib/sanity/queries";

export const dynamic = "force-static";

export const metadata = {
  title: "Buying Guides & Comparisons | ShopLink365",
  description: "Buying guides and product comparisons to help you choose the best deal.",
};

const GRADIENTS = [
  "linear-gradient(155deg,#FFE0B2,#FFB74D)",
  "linear-gradient(155deg,#C8E6C9,#81C784)",
  "linear-gradient(155deg,#B3E5FC,#4FC3F7)",
  "linear-gradient(155deg,#E1BEE7,#BA68C8)",
];

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <>
      <Header />
      <div className="section-block">
        <div className="section-head">
          <h3>📖 All Guides & Reviews</h3>
        </div>
        {guides.length === 0 ? (
          <p style={{ fontSize: 12.5, color: "#666" }}>No guides published yet — check back soon.</p>
        ) : (
          <div className="product-grid">
            {guides.map((g, i) => (
              <Link key={g._id} className="gcard" href={`/guides/${g.slug.current}`} style={{ width: "100%" }}>
                <div className="gphoto" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
                <div className="gbody">
                  <div className="gtag">{g.postType}</div>
                  <h4>{g.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}

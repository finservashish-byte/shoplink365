import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getAllGuides, getGuideBySlug } from "@/lib/sanity/queries";

export const dynamic = "force-static";

const EMPTY_PLACEHOLDER = "__no-guides-yet__";

export async function generateStaticParams() {
  const guides = await getAllGuides();
  if (guides.length === 0) return [{ slug: EMPTY_PLACEHOLDER }];
  return guides.map((g) => ({ slug: g.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === EMPTY_PLACEHOLDER) return { title: "Guides coming soon — ShopLink365" };
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found — ShopLink365" };
  return {
    title: `${guide.title} | ShopLink365`,
    description: guide.excerpt || guide.title,
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === EMPTY_PLACEHOLDER) {
    return (
      <>
        <Header />
        <div className="section-block">
          <div className="no-match-msg">
            <div className="no-match-icon">📖</div>
            <p>No guides published yet — check back soon.</p>
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <Header />
      <div className="section-block">
        <div className="gtag">{guide.postType}</div>
        <h1 className="detail-title">{guide.title}</h1>
        {guide.excerpt && <p className="detail-tagline">{guide.excerpt}</p>}
        <p style={{ fontSize: 12.5, color: "#666", marginTop: 16 }}>
          Full article body coming soon — this guide&apos;s rich-text content needs to be added in Sanity and
          rendered here.
        </p>
      </div>
      <BottomNav />
    </>
  );
}

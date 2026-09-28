import Link from "next/link";
import type { BlogPost } from "@/lib/sanity/queries";

const GRADIENTS = ["linear-gradient(155deg,#FFE0B2,#FFB74D)", "linear-gradient(155deg,#C8E6C9,#81C784)"];

export default function GuidesRail({ guides }: { guides: BlogPost[] }) {
  if (guides.length === 0) return null;
  return (
    <div className="section-block">
      <div className="section-head">
        <h3>📖 Guides & Reviews</h3>
        <a href="/guides">All Guides</a>
      </div>
      <div className="guides-rail">
        {guides.map((g, i) => (
          <Link key={g._id} className="gcard" href={`/guides/${g.slug.current}`}>
            <div className="gphoto" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
            <div className="gbody">
              <div className="gtag">{g.postType}</div>
              <h4>{g.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

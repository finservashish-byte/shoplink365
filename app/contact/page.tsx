import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-static";

export const metadata = {
  title: "Contact Us | ShopLink365",
  description: "Get in touch with ShopLink365.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="section-block">
        <h1 className="detail-title">Contact Us</h1>
        <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, marginTop: 10 }}>
          Questions, feedback, or a deal we should know about? Reach us at{" "}
          <a href="mailto:hello@shoplink365.com" style={{ color: "#2874F0", fontWeight: 700 }}>
            hello@shoplink365.com
          </a>
          , or join our WhatsApp channel from the home page for daily updates.
        </p>
      </div>
      <BottomNav />
    </>
  );
}

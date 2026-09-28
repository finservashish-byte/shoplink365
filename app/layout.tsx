import type { Metadata, Viewport } from "next";
import { withBase } from "@/lib/basePath";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopLink365 — Best Deals Across Amazon, Flipkart, Myntra & Meesho",
  description:
    "Tested picks and the best live deals across Amazon, Flipkart, Myntra and Meesho, all in one place. Compare prices and shop the store that has it cheapest.",
  manifest: withBase("/manifest.webmanifest"),
  icons: {
    icon: withBase("/favicon.ico"),
    apple: withBase("/apple-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#2874F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}

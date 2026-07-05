import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ShopLink365 | Honest Reviews for Indian Shoppers",
  description:
    "Premium, unbiased reviews of kitchen, grooming, books, and home & living products for the Indian market — in English and Hindi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1 max-w-[1120px] w-full mx-auto">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";
import { basePath } from "@/lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ShopLink365",
    short_name: "ShopLink365",
    description: "Best deals across Amazon, Flipkart, Myntra & Meesho, all in one place.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#F5F5F7",
    theme_color: "#2874F0",
    icons: [
      { src: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}

import type { NextConfig } from "next";
import { basePath } from "./lib/basePath";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;

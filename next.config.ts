import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["source.unsplash.com", "picsum.photos", "via.placeholder.com"],
  },
  env: {
    NEXT_PUBLIC_DEFAULT_PROFILE_SLUG:
      process.env.NEXT_PUBLIC_DEFAULT_PROFILE_SLUG || "hire",
  },
};

export default nextConfig;

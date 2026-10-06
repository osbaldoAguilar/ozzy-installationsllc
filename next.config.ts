import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Drop the 3840px step: full-width photos topped out around 800KB on retina screens
    // with no visible gain. 2048 still covers a 1024px-wide layout at 2x.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;

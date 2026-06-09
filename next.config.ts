import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    domains: [],
    unoptimized: false,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  poweredByHeader: false,

  compress: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

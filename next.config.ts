import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1728, 1920],
  },
  async redirects() {
    return [
      { source: "/legal", destination: "/terms", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zorga.co" }],
        destination: "https://zorga.co/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

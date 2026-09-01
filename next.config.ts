import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All raster assets are pre-sized WebP served as static files. The
    // Cloudflare deployment has no image resizer, so the /_next/image
    // pass-through hop is pure overhead; serve the files directly.
    unoptimized: true,
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

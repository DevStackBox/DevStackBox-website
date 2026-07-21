import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./content/docs/**/*"],
  },
  turbopack: {
    root: path.resolve("."),
  },
  async redirects() {
    return [
      {
        source: "/getting-started/:path*",
        destination: "/docs/getting-started/:path*",
        permanent: true,
      },
      {
        source: "/advanced/:path*",
        destination: "/docs/advanced/:path*",
        permanent: true,
      },
      {
        source: "/reference/:path*",
        destination: "/docs/reference/:path*",
        permanent: true,
      },
      {
        source: "/development/:path*",
        destination: "/docs/development/:path*",
        permanent: true,
      },
      {
        source: "/feature-status",
        destination: "/docs/feature-status",
        permanent: true,
      },
      {
        source: "/documentation",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/docs/development/adr/index",
        destination: "/docs/development/adr",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);

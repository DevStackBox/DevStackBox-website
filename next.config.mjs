import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./content/docs/**/*", "./content/root-markdown/**/*"],
  },
  async headers() {
    return [{source: "/:path*", headers: [
      {key: "X-Content-Type-Options", value: "nosniff"},
      {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      {key: "X-Frame-Options", value: "DENY"},
      {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
    ]}];
  },
  async redirects() {
    return [
      { source: "/faq", destination: "/docs/faq", permanent: true },
      { source: "/roadmap", destination: "/docs/roadmap", permanent: true },
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

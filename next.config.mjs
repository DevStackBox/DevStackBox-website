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
};

export default withMDX(nextConfig);

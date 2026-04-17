import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so Next doesn't guess based on the parent
    // Projects/ lockfile. Keeps CI builds on Vercel deterministic.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

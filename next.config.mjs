import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = config.resolve.alias ?? {};
    config.resolve.alias["@react-native-async-storage/async-storage$"] = path.resolve(
      __dirname,
      "src/shims/async-storage.ts"
    );
    return config;
  },
};

export default nextConfig;

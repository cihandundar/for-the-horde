import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com", "cdn.prod.website-files.com", "images.unsplash.com", "www.constantcontact.com", "www.shutterstock.com", "cdn.simpleicons.org"],

  },
};

export default nextConfig;

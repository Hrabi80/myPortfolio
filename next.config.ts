import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: "/**",
        protocol: "https",
        hostname: "res.cloudinary.com",
    
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;

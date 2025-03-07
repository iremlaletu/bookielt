
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
      dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
          },
          
        ],
        
    },
    experimental: {
      ppr: "incremental",
    },
   
};

export default nextConfig;

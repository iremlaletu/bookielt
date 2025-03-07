
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

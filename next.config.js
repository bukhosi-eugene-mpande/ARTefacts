/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "pagedone.io",
          pathname: "/asset/uploads/**",
        },
      ],
    },
  };
  
module.exports = nextConfig;
  
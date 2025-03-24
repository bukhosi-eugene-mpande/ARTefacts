/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["assets.aceternity.com","res.cloudinary.com"],
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
  
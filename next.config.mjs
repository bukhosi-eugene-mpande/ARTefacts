import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'assets.aceternity.com',
      'res.cloudinary.com',
      'artefact-1.s3.af-south-1.amazonaws.com',
      'ohsobserver.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pagedone.io',
        pathname: '/asset/uploads/**',
      },
    ],
  },

  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    NEXT_PUBLIC_USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID,
    NEXT_PUBLIC_USER_POOL_CLIENT_ID:
      process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    NEXT_PUBLIC_AWS_COGNITO_REGION: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY:
      process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(baseConfig);

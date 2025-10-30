/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['node-fetch']
  },
  // Enable fetch polyfill for Node.js
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Polyfill fetch for server-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'node-fetch': false,
      };
    }
    return config;
  },
}

module.exports = nextConfig;
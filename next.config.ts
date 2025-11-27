import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['say-cheese-profile.edge.naverncp.com'],
    deviceSizes: [320, 480, 590, 640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;

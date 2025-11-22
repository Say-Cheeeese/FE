import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['say-cheese-profile.edge.naverncp.com'],
  },
};

export default nextConfig;

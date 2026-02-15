import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Redirect Sanity intent URLs to the Studio base path
        source: '/intent/:path*',
        destination: '/studio/intent/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize chunk loading
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', '@tanstack/react-query'],
  },
  // Increase timeout for chunk loading
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Optimize bundle size
  swcMinify: true,
  // Increase timeout for development
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;

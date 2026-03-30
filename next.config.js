/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image optimization ──────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24h image cache
  },

  // ─── Compression ─────────────────────────────────────────────
  compress: true,

  // ─── Production optimizations ────────────────────────────────
  swcMinify: true,

  // ─── Bundle splitting ─────────────────────────────────────────
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: { allowedOrigins: ['localhost:3008', 'dubairovers.com', 'www.dubairovers.com'] },
  },

  // ─── Webpack optimizations ───────────────────────────────────
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Split large data files into separate chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        minSize: 20000,
        cacheGroups: {
          // Framework chunk
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            chunks: 'all',
          },
          // Data files (tours, blogs) in their own chunk
          data: {
            name: 'data',
            test: /[\\/]data[\\/]/,
            priority: 30,
            chunks: 'async', // only load when needed
          },
          // Shared components
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },

  // ─── HTTP caching headers ─────────────────────────────────────
  async headers() {
    return [
      // Static assets — cache 1 year
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Images — cache 24 hours
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // Pages — cache 5 min, revalidate in background
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=3600' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/tours/worldwide-tours',
        destination: '/tours/worldwide',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

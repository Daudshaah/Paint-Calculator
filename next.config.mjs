/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── WWW → non-www or non-www → www redirect ─────────────────────────────
  // Pick ONE canonical domain. We use www as canonical.
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'thepaintcalculator.com' }],
        destination: 'https://www.thepaintcalculator.com/:path*',
        permanent: true,
      },
      // Redirect http to https (backup — Vercel handles this but good to have)
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://www.thepaintcalculator.com/:path*',
        permanent: true,
      },
    ];
  },

  // ─── Headers for security + SEO ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Cache images aggressively
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // ─── Image optimization ───────────────────────────────────────────────────
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },

  // ─── Compress responses ───────────────────────────────────────────────────
  compress: true,

  // ─── Power headers ────────────────────────────────────────────────────────
  poweredByHeader: false,
};

export default nextConfig;

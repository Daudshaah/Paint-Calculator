import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  const headersList = headers();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host');
  const proto = headersList.get('x-forwarded-proto') ?? 'https';
  const requestUrl = host ? `${proto}://${host}` : '';

  if (envUrl && (!requestUrl || !envUrl.includes('localhost'))) {
    return envUrl;
  }

  return requestUrl || envUrl || 'http://localhost:3000';
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

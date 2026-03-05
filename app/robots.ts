import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

async function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host');
  const proto = headersList.get('x-forwarded-proto') ?? 'https';
  const requestUrl = host ? `${proto}://${host}` : '';

  if (envUrl && (!requestUrl || !envUrl.includes('localhost'))) {
    return envUrl;
  }

  return requestUrl || envUrl || 'http://localhost:3000';
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

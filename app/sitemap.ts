import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { locales, defaultLocale } from '@/i18n/config';

const PAGE_FILE_REGEX = /^page\.(tsx|ts|jsx|js|mdx)$/;

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

function collectStaticRoutes() {
  const root = path.join(process.cwd(), 'app', '[locale]');
  const seen = new Set<string>();

  function walk(dir: string, basePath: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const hasPage = entries.some((entry) => entry.isFile() && PAGE_FILE_REGEX.test(entry.name));
    if (hasPage) {
      seen.add(basePath || '/');
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('@')) continue; // skip parallel routes
      if (entry.name.startsWith('[')) continue; // skip dynamic segments

      const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');
      const nextBase = isRouteGroup
        ? basePath || '/'
        : `${basePath}/${entry.name}`.replace(/\/+/g, '/');

      walk(path.join(dir, entry.name), nextBase === '' ? '/' : nextBase);
    }
  }

  walk(root, '');
  return Array.from(seen);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = collectStaticRoutes();
  const now = new Date();

  return routes.map((route) => {
    const slug = route === '/' ? '' : route;
    const languages: Record<string, string> = {};

    locales.forEach((locale) => {
      languages[locale] = `${siteUrl}/${locale}${slug}`;
    });

    languages['x-default'] = `${siteUrl}/${defaultLocale}${slug}`;

    return {
      url: `${siteUrl}/${defaultLocale}${slug}`,
      lastModified: now,
      alternates: { languages },
    };
  });
}

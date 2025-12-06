import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ur', 'hi'] as const;
const defaultLocale = 'en' as const;

type Locale = (typeof locales)[number];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    let locale = defaultLocale;

    // Get the locale from Accept-Language header or use default
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
      if (locales.includes(preferredLocale as Locale)) {
        locale = preferredLocale as Locale;
      }
    }

    const newPath = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, static files, and image files
    '/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
};


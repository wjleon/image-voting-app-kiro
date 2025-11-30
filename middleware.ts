import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

/**
 * Middleware for locale detection
 * 
 * Handles:
 * 1. Locale detection from cookie or Accept-Language header
 * 2. Redirects to localized paths
 * 3. Sets locale cookie for persistence
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Locale detection and routing
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If path already has a locale, update cookie if needed and continue
  if (pathnameHasLocale) {
    // Extract the locale from the pathname
    const localeInPath = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (localeInPath) {
      const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

      // Update cookie if it doesn't match the path locale
      if (localeCookie !== localeInPath) {
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', localeInPath, {
          maxAge: 60 * 60 * 24 * 365, // 365 days
          sameSite: 'lax',
          path: '/',
        });
        return response;
      }
    }

    return NextResponse.next();
  }

  // Detect locale from cookie or Accept-Language header
  const locale = detectLocale(request);

  // Redirect to localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);

  // Set locale cookie with 365-day expiration
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 365 days
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

/**
 * Detect user's preferred locale
 * Priority: Cookie > Accept-Language header > Default
 */
function detectLocale(request: NextRequest): string {
  // Check for locale cookie first
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse language preferences (e.g., "en-US,en;q=0.9,es;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, qValue] = lang.trim().split(';');
        const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0;
        return { code: code.split('-')[0].toLowerCase(), quality };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find first supported language
    for (const { code } of languages) {
      if (locales.includes(code as any)) {
        return code;
      }
    }
  }

  // Default to English
  return defaultLocale;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - Static files
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};

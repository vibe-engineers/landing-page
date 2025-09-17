import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  // Apply middleware to all routes except Next.js internals and static assets
  matcher: ['/', '/((?!_next|.*\\..*).*)']
};

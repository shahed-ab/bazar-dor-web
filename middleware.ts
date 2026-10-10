import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  const isProtected =
    pathname.startsWith('/product/') ||
    pathname === '/profile' ||
    pathname.startsWith('/profile/');

  if (isProtected && !sessionCookie) {
    const callbackURL = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(
      new URL(`/signin?callbackURL=${callbackURL}&reason=login-required`, request.url)
    );
  }

  // If already logged in and visiting /signin or /signup, redirect to Home
  const isAuthRoute = pathname === '/signin' || pathname === '/signup';
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/profile', '/profile/:path*', '/signin', '/signup'],
};

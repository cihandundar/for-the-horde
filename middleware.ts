import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('__Secure-next-auth.session-token')?.value || 
                request.cookies.get('next-auth.session-token')?.value;

  const isLoggedIn = !!token;

  // Giriş gerektiren route'lar
  const protectedPaths = ['/checkout', '/account', '/orders', '/wishlist', '/admin'];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath === path || currentPath.startsWith(`${path}/`)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/account', '/orders', '/wishlist', '/admin/:path*'],
};

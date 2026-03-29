import { NextResponse } from 'next/server';

// Google bot IP ranges (simplified)
const BOT_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'sogou', 'exabot', 'facebot', 'ia_archiver',
];

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Add bot detection header
  const isBot = BOT_AGENTS.some(b => userAgent.includes(b));

  const response = NextResponse.next();
  response.headers.set('x-is-bot', isBot ? '1' : '0');
  response.headers.set('x-pathname', pathname);

  // Block admin from search engines
  if (pathname.startsWith('/admin') && isBot) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

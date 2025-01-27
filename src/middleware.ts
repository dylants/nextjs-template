import projectConfig from '@/config/index';
import { createId } from '@paralleldrive/cuid2';
import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next({
    headers: {
      [projectConfig.headers.requestId]: createId(),
    },
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

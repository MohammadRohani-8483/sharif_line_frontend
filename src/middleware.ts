import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('x-next-pathname', request.nextUrl.pathname);
    requestHeaders.set('x-search-params',request.nextUrl.searchParams.toString());
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    } as any);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
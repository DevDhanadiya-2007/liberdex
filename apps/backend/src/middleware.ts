import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];

export function middleware(req: NextRequest) {
    const origin = req.headers.get('origin');

    if (origin && allowedOrigins.includes(origin)) {
        const res = NextResponse.next();

        res.headers.set('Access-Control-Allow-Origin', origin);
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.headers.set('Access-Control-Allow-Credentials', 'true');

        if (req.method === 'OPTIONS') {
            return new NextResponse(null, { headers: res.headers });
        }

        return res;
    }

    return new NextResponse('Forbidden', { status: 403 });
}

export const config = {
    matcher: '/api/:path*',
};

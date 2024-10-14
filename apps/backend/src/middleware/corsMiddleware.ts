import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];

export function applyCors(req: Request) {
    const origin = req.headers.get('origin');

    if (origin && allowedOrigins.includes(origin)) {
        const res = new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        });

        return res;
    }

    return new NextResponse(null, { status: 200 });
}
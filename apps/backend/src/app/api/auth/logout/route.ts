import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    try {

        const authCookie = serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: -1,
            path: '/',
        });

        const response = NextResponse.json({ message: 'Logout successful' });
        response.headers.append('Set-Cookie', authCookie);

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

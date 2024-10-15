import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
    try {
        const authToken = req.cookies.get('authToken')?.value;

        if (!authToken) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        const decoded = jwt.verify(authToken, JWT_SECRET);
        return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}

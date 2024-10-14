import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { applyCors } from "apps/backend/src/middleware/corsMiddleware";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function OPTIONS(req: NextRequest) {
    return applyCors(req);
}

export async function POST(req: NextRequest) {
    // Apply CORS to all responses
    const corsRes = applyCors(req);

    try {
        const { email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400, headers: corsRes.headers });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        return NextResponse.json({ message: "User registered successfully" }, { status: 201, headers: corsRes.headers });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({
            message: "Error occurred while registering",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500, headers: corsRes.headers });
    }
}
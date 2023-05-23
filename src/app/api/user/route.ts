import { prisma } from '@/lib/prisma/prisma';
import { NextRequest, NextResponse as response } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return response.json({ error: `Missing id` }, { status: 404 });

    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader) return response.json({}, { status: 401 });

    const appSecret = authorizationHeader.split(' ')[1];
    if (!appSecret) return response.json({}, { status: 401 });

    const isValid = await prisma.application.findFirst({ where: { secret: appSecret } });
    if (!isValid) return response.json({}, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: id } });
    if (!user) return response.json({ error: `User ${id} not found` }, { status: 404 });

    return response.json(user);
}

import { applicationService, userService } from '@/db/handler';
import * as jwt from 'jsonwebtoken';
import { NextRequest, NextResponse as response } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader) return response.json({}, { status: 401 });

    const accessToken = authorizationHeader.split(' ')[1];
    const decodedAccessToken = jwt.decode(accessToken) as any;

    if (!['Admin', 'Role'].includes(decodedAccessToken.role)) {
        return response.json({}, { status: 401 });
    }

    if (id) {
        const user = await userService.getUserById(id);
        if (!user) return response.json({ error: `User ${id} not found` }, { status: 404 });

        return response.json(user);
    }

    if (email) {
        const user = await userService.getUserByEmail(email);
        if (!user) return response.json({ error: `User ${id} not found` }, { status: 404 });

        return response.json(user);
    }
}

import { authOptions } from '@/lib/next-auth/authOptions';
import { prisma } from '@/lib/prisma/prisma';
import moment from 'moment';
import { getServerSession } from 'next-auth';
import { NextResponse as response } from 'next/dist/server/web/spec-extension/response';

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) return response.json({}, { status: 401 });

    // verify that id has been passed and is valid
    const { id } = await request.json();
    if (!id) return response.json({}, { status: 400, statusText: 'Missing id' });
    const validId = await prisma.application.findUnique({ where: { id: id } });
    if (typeof id !== 'number' || !validId) return response.json({}, { status: 400, statusText: 'Invalid id' });

    // upsert the user's application in the database
    const userApp = await prisma.userApplication.upsert({
        where: {
            applicationId_userId: {
                applicationId: id,
                userId: user.id,
            },
        },
        update: {
            lastAccessed: moment().toDate(),
        },
        create: {
            application: {
                connect: {
                    id: id,
                },
            },
            user: {
                connect: {
                    id: user.id,
                },
            },
            lastAccessed: moment().toDate(),
        },
    });

    return response.json(
        {
            id: userApp.applicationId,
            lastAccessed: userApp.lastAccessed,
        },
        { status: 201 }
    );
}

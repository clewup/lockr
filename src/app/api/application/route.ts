import { applicationService, userApplicationService } from '@/db/handler';
import { authOptions } from '@/lib/next-auth/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse as response } from 'next/dist/server/web/spec-extension/response';

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) return response.json({}, { status: 401 });

    // verify that id has been passed and is valid
    const { id } = await request.json();
    if (!id) return response.json({}, { status: 400, statusText: 'Missing id' });
    const validId = await applicationService.getApplicationById(id);
    if (typeof id !== 'number' || !validId) return response.json({}, { status: 400, statusText: 'Invalid id' });

    const userApplication = await userApplicationService.upsertUserApplication(id, user.id);

    return response.json(userApplication, { status: 201 });
}

import { UserApplicationType } from '@/types/applicationTypes';
import { UserApplication } from '@prisma/client';

export function mapUserApplication(userApplication: UserApplication): UserApplicationType {
    return {
        id: userApplication.applicationId,
        lastAccessed: userApplication.lastAccessed,
    };
}

export function mapUserApplications(userApplications: UserApplication[]): UserApplicationType[] {
    return userApplications.map((userApplication) => mapUserApplication(userApplication));
}

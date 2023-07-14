export type ApplicationType = {
    id: number;
    name: string;
    url: string;
    logo: string | null;
    color: string | null;
};

export type UserApplicationType = {
    id: number;
    lastAccessed: Date | null;
};

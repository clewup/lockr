const constants = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
};

export default constants;

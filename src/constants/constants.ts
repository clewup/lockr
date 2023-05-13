const constants = {
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SECRET: process.env.SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
};

export default constants;

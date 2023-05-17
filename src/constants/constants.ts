const constants = {
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    SECRET: process.env.SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    SENDGRID_SERVER: process.env.SENDGRID_SERVER,
    SENDGRID_PORT: parseInt(process.env.SENDGRID_PORT as string),
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
};

export default constants;

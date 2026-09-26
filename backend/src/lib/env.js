import "dotenv/config";

const required = (value, name) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};

export const env = Object.freeze({
    port: process.env.PORT,
    nodeENV: process.env.NODE_ENV,
    monogoDBUri: required(process.env.MONGODB_URI, "MONGODB_URI"),
    jwtSecret: required(process.env.JWT_SECRET, "JWT_SECRET"),
    resendApi: required(process.env.RESEND_API,"RESEND_API"),
    fromEmail: required(process.env.EMAIL_FROM,"EMAIL_FROM"),
    clientUrl: required(process.env.CLIENT_URL,"CLIENT_URL"),
    fromEmailName: required(process.env.EMAIL_FROM_NAME,"EMAIL_FROM_NAME"),
    dummyPasswordHash: required(process.env.DUMMY_PASSWORD_HASH, "DUMMY_PASSWORD_HASH"),
});

import "dotenv/config";

export const env = {
    port:process.env.PORT,
    monogoDBUri: process.env.MONGODB_URI,
    nodeENV: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
    resendApi: process.env.RESEND_API,
    fromEmail: process.env.EMAIL_FROM,
    fromEmailName: process.env.EMAIL_FROM_NAME,
}
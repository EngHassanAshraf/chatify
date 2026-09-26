import "dotenv/config";

export const env = Object.freeze({
    port: process.env.PORT,
    nodeENV: process.env.NODE_ENV,
    monogoDBUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    resendApi: process.env.RESEND_API,
    fromEmail: process.env.EMAIL_FROM,
    clientUrl: process.env.CLIENT_URL,
    fromEmailName: process.env.EMAIL_FROM_NAME,
});

const productionRequired = [
    "monogoDBUri",
    "jwtSecret",
    "resendApi",
    "fromEmail",
];

if (env.nodeENV === "production") {
    const missing = productionRequired.filter((key) => !env[key]);
    if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

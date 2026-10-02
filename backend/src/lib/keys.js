import env from "./env.js";

const parseBase64Key = (b64Key) => {
    if (!b64Key) throw new Error("RSA Key missing from environment variables");
    return Buffer.from(b64Key, "base64").toString("utf-8");
};

export const PRIVATE_KEY = parseBase64Key(env.jwtPrivateKeyB64);
export const PUBLIC_KEY = parseBase64Key(env.jwtPublicKeyB64);
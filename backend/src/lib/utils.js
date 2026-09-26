import jwt from "jsonwebtoken";
import { env } from "./env.js";

let { nodeENV, jwtSecret } = env;
if (!nodeENV) nodeENV = "production";
if (!jwtSecret) throw new Error("JWT Secret is not configured");

// const REFRESH_TOKEN_EXPIRES_IN = "7d";
// const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in mileseconds
// const REFRESH_COOKIE_OPTIONS = {
//     httpOnly: true,
//     secure: nodeENV === "production",
//     sameSite: "strict",
//     path: "/api/auth/refresh", // Restrict cookie scope to refresh route
//     maxAge: REFRESH_COOKIE_MAX_AGE,
// };

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const ACCESS_COOKIE_MAX_AGE = 15 * 60 * 1000;
const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: nodeENV === "production",
    sameSite: "strict",
    maxAge: ACCESS_COOKIE_MAX_AGE,
};



export const generateAccessToken = (userId, res) => {
    const payload = { userId, type: "access" };
    const tokenOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN, }

    const token = jwt.sign(payload, jwtSecret, tokenOptions)
    res.cookie("jwt", token, ACCESS_COOKIE_OPTIONS);
}
// TODO: generate a Public/Private key pairs using openssl and use them

// const PRIVATE_KEY = env.jwtPrivateKey;
// const PUBLIC_KEY = env.jwtPublicKey;
// export const generateAccessToken = (userId, res) => {
//     const payload = { userId, type: "access" };
//     const tokenOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_IN, algorithm: "RS256" }
//     const token = jwt.sign(
//         payload,
//         jwtSecret,
//         tokenOptions
//     )
//     res.cookie("jwt", token, ACCESS_COOKIE_OPTIONS);
// }


// export const verifyAccessToken = (token) => {

//     try {
//         const decoded = jwt.verify(
//             token,
//             PUBLIC_KEY, 
//             {algorithms: ["RS256"]}
//         );

//         return { valid: true, decoded };

//     } catch (error) {
//         return { valid: false, error: error.message };
//     }
// };

// export const generateRefreshToken = (userId, res) => {
//     const token = jwt.sign({ userId }, jwtSecret, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })
//     res.cookie("jwt", token, REFRESH_COOKIE_OPTIONS);
// }

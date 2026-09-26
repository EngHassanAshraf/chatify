import jwt from "jsonwebtoken";
import {env} from "./env.js";

let {nodeENV, jwtSecret} = env;

if(!nodeENV) nodeENV="production";

const JWT_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "strict",
    secure: nodeENV === "production",
    maxAge: COOKIE_MAX_AGE,
};

export const generateToken = (userId, res) => {
    if(!jwtSecret) throw new Error("JWT Secret is not configured");
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: JWT_EXPIRES_IN })
    res.cookie("jwt", token, COOKIE_OPTIONS);
}
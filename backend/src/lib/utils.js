import jwt from "jsonwebtoken";


let {NODE_ENV, JWT_SECRET} = process.env
if(!NODE_ENV) NODE_ENV="production"

const JWT_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
};

export const generateToken = (userId, res) => {
    if(!JWT_SECRET) throw new Error("JWT Secret is not configured");
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    res.cookie("jwt", token, COOKIE_OPTIONS);
}
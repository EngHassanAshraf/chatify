import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
};

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    res.cookie("jwt", token, COOKIE_OPTIONS);
}
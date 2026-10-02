import User from "../models/User.js";
import {
    validateEmail,
    validatePassword,
    validatefullname,
} from "../validators/auth.validator.js";

import { verifyAccessToken } from "../lib/tokens.js";
import { resMessage } from "../lib/resMessage.js";



export const validateSignup = (req, res, next) => {
    const { fullname, email, password } = req.body;
    // Check that all fields exist
    if (!fullname || !email || !password) return resMessage(res, 400, { message: "All fields are required" })

    if (!validatefullname(fullname)) return resMessage(res, 400, { message: "Invalid full name" })

    if (!validateEmail(email)) return resMessage(res, 400, { message: "Invalid email" })

    if (!validatePassword(password)) return resMessage(res, 400, { message: "Invalid password" })

    const normalizedName = fullname.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Put cleaned data back into req.body
    req.body.fullname = normalizedName;
    req.body.email = normalizedEmail;

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    // Check that all fields exist
    if (!email || !password) return resMessage(res, 400, { message: "All fields are required" })

    if (!validateEmail(email)) return resMessage(res, 400, { message: "Invalid email" })

    next();
};


export const isAuth = async (req, res, next) => {
    try {

        const token = req.cookies.accessToken;

        if (!token) return resMessage(res, 401, "authentication failed");

        const isValid = verifyAccessToken(token);
        if (!isValid.valid) return resMessage(res, 401, isValid.error);

        const decodedToken = isValid.decoded;

        const user = await User.findById(decodedToken.userId);
        if(!user) return resMessage(res, 401, "User not found")
        req.user = user;

        next();

    } catch (error) {
        console.error(`Error while check authentication ${error.message}`);
        return resMessage(res, 500, "Internal Server Error");
    }
}

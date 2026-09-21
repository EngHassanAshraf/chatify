import {
    validateEmail,
    validatePassword,
    validatefullname,
} from "../validators/auth.validator.js";

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

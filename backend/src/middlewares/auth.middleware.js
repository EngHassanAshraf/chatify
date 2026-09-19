import {
    validateEmail,
    validatePassword,
    validatefullname,
} from "../validators/auth.validator.js";

export const validateSignup = (req, res, next) => {
    const { fullname, email, password } = req.body;
    // Check that all fields exist
    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // Check that fields are strings
    if (
        typeof fullname !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            message: "Invalid input",
        });
    }

    const normalizedName = fullname.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Validate full name
    if (!validatefullname(normalizedName)) {
        return res.status(400).json({
            message: "Invalid full name",
        });
    }

    // Validate email
    if (!validateEmail(normalizedEmail)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    // Validate password
    if (!validatePassword(password)) {
        return res.status(400).json({
            message: "Invalid password",
        });
    }

    // Put cleaned data back into req.body
    req.body.fullname = normalizedName;
    req.body.email = normalizedEmail;

    next();
};

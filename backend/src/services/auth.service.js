import bcrypt from "bcrypt";
import User from "../models/User.js";

const generateUsername = (email) => {
    const baseUsername = email.split("@")[0];

    return baseUsername;
}

export const createUser = async (userData) => {

    try {
        const { fullname, email, password } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error("Email already exists");

        const username = generateUsername(email);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullname, username, email, hashedPassword });

        return {
            id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
        };

    } catch (error) {
        throw error;
    }
}
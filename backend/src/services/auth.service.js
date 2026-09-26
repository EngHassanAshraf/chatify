import bcrypt from "bcrypt";
import User from "../models/User.js";

const generateUsername = (email) => {
    const baseUsername = email.split("@")[0];

    return baseUsername;
}

export const createUser = async (userData) => {

    const { fullname, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) return { success: false, error: "Email already exists!" };

    const username = generateUsername(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, username, email, hashedPassword });
    return { success: true, user };


}

export const loginService = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ normalizedEmail });

    if (!user) {
        await bcrypt.compare(password, env.dummyPasswordHash);
        return { success: false, error: "Invalid email or password" };
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) return { success: false, error: "Invalid email or password" };

    const newDate = new Date();
    await user.updateOne({ $set: { last_login: newDate } });
    user.last_login = newDate;
    return { success: true, user };
}
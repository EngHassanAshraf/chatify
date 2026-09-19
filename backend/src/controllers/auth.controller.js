import { createUser } from "../services/auth.service.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {

    const { fullname, email, password } = req.body;

    try {
        const user = await createUser({ fullname, email, password });
        const token =  generateToken(user.id, res);

        return res.status(201).json({ message: "User created successfully", token });

    } catch (error) {
        if (error.message === "Email already exists") {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Signup error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
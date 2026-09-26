import { createUser } from "../services/auth.service.js";
import { generateToken } from "../lib/utils.js";
import { resMessage } from "../lib/resMessage.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { env } from "../lib/env.js";

export const signup = async (req, res) => {

    const { fullname, email, password } = req.body;
    const clientURL = env.clientUrl;

    try {
        const user = await createUser({ fullname, email, password });
        generateToken(user.id, res);
        sendWelcomeEmail(user.email, user.fullname, clientURL).catch((error)=>{
            console.error("Failed to send welcome email: ",  error, "to user: ", user.email);
        });
        return resMessage(res, 201, { message: "User created successfully", user });
    } catch (error) {
        if (error.message === "Email already exists") {
            return resMessage(res, 409, { message: "Email already exists" })
        }
        console.error("Signup error", error);
        return resMessage(res, 500, { message: "Internal Server Error" })
    }
}
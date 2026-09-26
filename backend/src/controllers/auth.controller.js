import { createUser, loginService } from "../services/auth.service.js";
import { generateRefreshToken } from "../lib/utils.js";
import { resMessage } from "../lib/resMessage.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { env } from "../lib/env.js";

export const signup = async (req, res) => {

    const { fullname, email, password } = req.body;
    const clientURL = env.clientUrl;

    try {

        const result = await createUser({ fullname, email, password });
        if (!result.success) return resMessage(res, 409, { message: result.error });

        const user = result.user.toJSON();

        generateRefreshToken(user.id, res);

        sendWelcomeEmail(user.email, user.fullname, clientURL).catch((error) => {
            console.error("Failed to send welcome email: ", error, "to user: ", user.email);
        });

        return resMessage(res, 201, user);
    } catch (error) {
        console.error("signup error: ", error.message);
        return resMessage(res, 500, { message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        const result = await loginService(email, password);
        if (!result.success) return resMessage(res, 401, { message: result.error });

        const user = result.user.toJSON();
        generateRefreshToken(user.id, res);

        return resMessage(res, 200, user);

    } catch (error) {
        console.error("login error details: ", error.message);
        return resMessage(res, 500, { message: "Internal Server Error" });
    }
}

export const logout = (_, res) => {
    res.cookie(
        "jwt",
        "",
        {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: env.nodeEnv === "production",
        }
    );

    return resMessage(res, 200, { message: "Logged Out" });
};

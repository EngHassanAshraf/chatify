import {resendClient, senderInfo} from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./templates/welcomeEmailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${senderInfo.name} <${senderInfo.email}>`,
        to: email,
        subject: "No limits! Welcome to your own place",
        html:createWelcomeEmailTemplate(name, clientURL)
    });

    if(error){
        console.log("Failed to send welcome email: ", error)
        throw new Error("Failed to send welcome email: ", error);
    }

    console.log("Welcome email sent successfully",data)
};
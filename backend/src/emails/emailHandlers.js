import { resendClient, senderInfo } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./templates/welcomeEmailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    if (!senderInfo?.email || !senderInfo?.name) {
        throw new Error("Email sender config missing (EMAIL_FROM/EMAIL_FROM_NAME).");
    }
    if (!email) throw new Error("Recipient email is required.");
    if (!clientURL) throw new Error("client Url is required.");

    const { data, error } = await resendClient.emails.send({
        from: `${senderInfo.name} <${senderInfo.email}>`,
        to: email,
        subject: "No Limits! Welcome to your own place",
        html: createWelcomeEmailTemplate(name, clientURL),
        text: `
        Welcome ${name}, 
            with No Limits you can do too many enjoyable stuffs,
            so lets Get Started: 
                        ${clientURL}
        `
    });

    if (error) {
        console.log("Failed to send welcome email: ", error)
        throw new Error("Failed to send welcome email: ", error);
    }

    console.log("Welcome email sent successfully", data)
};

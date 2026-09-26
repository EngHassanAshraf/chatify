import { Resend } from "resend";
import {env} from "./env.js";

const resendAPIKey = env.resendApi;
const emailFrom = env.fromEmail;
const emailFromName = env.fromEmailName;

if (!resendAPIKey) throw new Error("Resend API Key is not set");
if (!emailFrom) throw new Error("Email From is not set");


export const resendClient = new Resend(resendAPIKey);

export const senderInfo = {
    email: emailFrom,
    name: emailFromName || "No Limits!"
}
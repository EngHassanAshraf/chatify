import { Resend } from "resend";
import {env} from "./env.js";

const resendAPIKey = env.resendApi;
const emailFrom = env.fromEmail;
const emailFromName = env.fromEmailName;

export const resendClient = new Resend(resendAPIKey);

export const senderInfo = {
    email: emailFrom,
    name: emailFromName
}
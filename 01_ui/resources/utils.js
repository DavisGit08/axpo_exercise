// Utilities to help on UI
import { MailSlurp } from "mailslurp-client";
import data from "./data/data";
import axios from "axios";

async function retrieveApiKeyFromEmail() {
    try {
        const EMAIL_BODY = await retrieveBodyFromEmail();
        await deleteAllEmails();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await createApiKey(extractLink(EMAIL_BODY));
        const EMAIL_API_KEY = await retrieveBodyFromEmail();
        return extractApiKey(EMAIL_API_KEY);
    } catch (err) {
        console.error("❌ Error in retrieveApiKeyFromEmail:", err.message);throw err;}
}

async function retrieveBodyFromEmail() {
    const mailslurp = new MailSlurp({ apiKey: data.EMAIL_API_KEY });
    const inboxId = data.INBOX_ID;
    const timeout = 80000;
    const pollingInterval = 5000;
    const startTime = Date.now();
    try {
        console.log("Waiting for new email...");
        while (Date.now() - startTime < timeout) {
            let emails = await mailslurp.inboxController.getEmails({ inboxId });
            if (emails && emails.length > 0) {
                let latestEmail = emails[0];
                console.log(`📩 Email received: ${latestEmail.subject}`);
                let fullEmail = await mailslurp.emailController.getEmail({ emailId: latestEmail.id });
                let attempts = 10;
                while (!fullEmail.body && attempts > 0) {
                    console.log(`⏳ Email body is empty. Retrying in 0.5s... (${attempts} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    fullEmail = await mailslurp.emailController.getEmail({ emailId: latestEmail.id });
                    attempts--;
                }
                if (!fullEmail.body) {throw new Error(`⛔ Email body is still empty after ${attempts} retries.`);}
                console.log("📜 Email body retrieved successfully.");
                return fullEmail.body;
            }
            console.log("⏳ No new email yet, retrying in 5s...");
            await new Promise(resolve => setTimeout(resolve, pollingInterval));
        }
        throw new Error("⛔ No email received within timeout.");
    } catch (error) {
        console.error("⚠️ Error retrieving email:", error.message);
        throw error;
    }
}



async function deleteAllEmails() {
    const inboxId = data.INBOX_ID;
    const mailslurp = new MailSlurp({ apiKey: data.EMAIL_API_KEY });
    try {
        await mailslurp.inboxController.deleteAllInboxEmails({ inboxId });
        console.log("Emails have been deleted.");
    } catch (error) {
        console.error("⚠️ Emails could not be deleted.", error);
    }
}

async function createApiKey(link){
    try {
        const response = await axios.get(link);
        console.log("API Key successfully generated and sent by email.");
        return response.data;

    } catch (error) {
        console.error("❌ Error:", error.message); throw new Error("Failed trying to generate the API Key from link.");
    }
}

function extractLink(text){
    const regex = /a href='([^']+)'/;
    const resp = text.match(regex);
    return resp[1];
}

function extractApiKey(text){
    const regex = /'>([^']+)<\/textarea/;
    const resp = text.match(regex);
    return resp[1];
}

function title(text){
    console.log(`#######T·E·S·T: ${text}`);
}


module.exports = {retrieveApiKeyFromEmail, retrieveBodyFromEmail, createApiKey, extractApiKey, deleteAllEmails, title};
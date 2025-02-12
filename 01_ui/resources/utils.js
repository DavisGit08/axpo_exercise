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
    const MAILSLURP = new MailSlurp({ apiKey: data.EMAIL_API_KEY });
    const inboxId = data.INBOX_ID;
    const TIMEOUT = 80000;
    const POLLING_INTERVAL = 5000;
    const START_TIME = Date.now();
    try {
        console.log("Waiting for new email...");
        while (Date.now() - START_TIME < TIMEOUT) {
            let emails = await MAILSLURP.inboxController.getEmails({ inboxId });
            if (emails && emails.length > 0) {
                let latestEmail = emails[0];
                console.log(`📩 Email received: ${latestEmail.subject}`);
                let fullEmail = await MAILSLURP.emailController.getEmail({ emailId: latestEmail.id });
                let attempts = 10;
                while (!fullEmail.body && attempts > 0) {
                    console.log(`⏳ Email body is empty. Retrying in 0.5s... (${attempts} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    fullEmail = await MAILSLURP.emailController.getEmail({ emailId: latestEmail.id });
                    attempts--;
                }
                if (!fullEmail.body) {throw new Error(`⛔ Email body is still empty after ${attempts} retries.`);}
                console.log("Email body retrieved successfully.");
                return fullEmail.body;
            }
            console.log("⏳ No new email yet, retrying in 5s...");
            await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));
        }
        throw new Error("⛔ No email received within timeout.");
    } catch (error) {
        console.error("⚠️ Error retrieving email:", error.message);
        throw error;
    }
}

async function deleteAllEmails() {
    const inboxId = data.INBOX_ID;
    const MAILSLURP = new MailSlurp({ apiKey: data.EMAIL_API_KEY });
    try {
        await MAILSLURP.inboxController.deleteAllInboxEmails({ inboxId });
        console.log("Emails have been deleted.");
    } catch (error) {
        console.error("⚠️ Emails could not be deleted.", error);
    }
}

async function createApiKey(link){
    try {
        const RESP = await axios.get(link);
        console.log("API Key successfully generated and sent by email.");
        return RESP.data;

    } catch (error) {
        console.error("❌ Error:", error.message); throw new Error("Failed trying to generate the API Key from link.");
    }
}

function extractLink(text){
    const REGEX = /a href='([^']+)'/;
    const RESP = text.match(REGEX);
    return RESP[1];
}

function extractApiKey(text){
    const REGEX = /'>([^']+)<\/textarea/;
    const RESP = text.match(REGEX);
    return RESP[1];
}

function setTestInfo(testInfo){
    global.globalTestInfo = testInfo;
}

function getTestInfo(){
    return global.globalTestInfo;
}

function title(text){
    console.log(`#######T·E·S·T: ${text}`);
}


module.exports = {retrieveApiKeyFromEmail, retrieveBodyFromEmail, createApiKey, extractApiKey, deleteAllEmails, setTestInfo, getTestInfo, title};
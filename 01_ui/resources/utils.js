// Utilities to help on UI
import { MailSlurp } from "mailslurp-client";
import data from "./data/data";
import axios from "axios";

async function validateCaptcha(page) {
    try {
        const frame = await page.frameLocator('iframe[title="reCAPTCHA"]');
        const checkbox = frame.locator('#recaptcha-anchor');
        await checkbox.waitFor({ state: 'visible' });
        const box = await checkbox.boundingBox();
        if (!box) {throw new Error('❌ Couldnt retrievew boundingBox reCAPTCHA.');}
        console.log('Found Captcha, trying user simulation...');
        await page.mouse.move(box.x + Math.random() * box.width, box.y + Math.random() * box.height);
        await page.waitForTimeout(Math.random() * 500 + 300);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
        await page.waitForTimeout(Math.random() * 500 + 300);
        await checkbox.hover();
        await page.waitForTimeout(Math.random() * 500 + 300);
        await page.mouse.down();
        await page.waitForTimeout(Math.random() * 150 + 100);
        await page.mouse.up();
        console.log('Captcha marked...');
        await page.waitForTimeout(1000);
        const isChecked = await checkbox.getAttribute('aria-checked');
        if (isChecked === 'true'){console.log("🟢 CAPTCHA validated successfully.");}
        else{
            console.log("⛔ CAPTCHA image activated. Can't continue.");
            throw new Error("CAPTCHA challenge appeared.");
        }
    } catch (err) {
        console.error("❌ Error validando Captcha:", err.message);
        throw err;
    }
}

async function retrieveApiKeyFromEmail() {
    try {
        const EMAIL_BODY = await retrieveBodyFromEmail();
        await this.deleteAllEmails();
        await createApiKey(extractLink(EMAIL_BODY));
        const EMAIL_API_KEY = await retrieveBodyFromEmail();
        return extractApiKey(EMAIL_API_KEY);
    } catch (err) {
        console.error("❌ Error in retrieveApiKeyFromEmail:", err.message);throw err;}
}

async function retrieveBodyFromEmail() {
    const mailslurp = new MailSlurp({ apiKey: data.EMAIL_API_KEY });
    const inboxId = data.INBOX_ID;
    try {
        console.log("📬 Waiting for new email...");
        const email = await mailslurp.waitForLatestEmail(inboxId, 80000);     
        if (!email) {
            throw new Error("⛔ No email received.");
        }
        console.log(`📩 Email received: ${email.subject}`);
        return email.body;
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
    console.log(resp[1])
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


module.exports = {validateCaptcha, retrieveApiKeyFromEmail, retrieveBodyFromEmail, createApiKey, extractApiKey, deleteAllEmails, title};
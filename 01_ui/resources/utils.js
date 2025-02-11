// Utilities to help on UI
import { MailSlurp } from "mailslurp-client";
import Data from "./data/data";
import axios from "axios";

async function validateCaptcha(page){
    try{
        const frame = await page.frameLocator('iframe[title="reCAPTCHA"]');
        const checkbox = frame.locator('#recaptcha-anchor');
        
        await checkbox.waitFor({ state: 'visible' });
        const box = await checkbox.boundingBox();
        
        if (box) {
            await page.mouse.move(box.x + 5, box.y + 5); 
            await page.waitForTimeout(500);
            await page.mouse.move(box.x + box.width - 5, box.y + 5); 
            await page.waitForTimeout(500);
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.waitForTimeout(500);
        
            await checkbox.hover();
            await page.waitForTimeout(300);
            await page.mouse.down();
            await page.waitForTimeout(150);
            await page.mouse.up();
            const checkmark = frame.locator('.recaptcha-checkbox-checkmark');
            await checkmark.waitFor({ state: 'visible' });
        } else {
            console.error("No se pudo obtener el boundingBox del recaptcha.");
        }
        await new Promise(resolve => setTimeout(resolve,1000));
    } catch(err){console.error("❌ Captcha validation error:", err.message); throw err;}

}

async function createEmail() {
    try {
        const mailslurp = new MailSlurp({ apiKey: Data.EMAIL_API_KEY });
        const inbox = await mailslurp.inboxController.createInboxWithDefaults();
        return inbox;
    } catch (err) {
        console.error("❌ Error creating inbox:", err.message); throw new Error("Error creating inbox with MailSlurp.");}
}

async function retrieveApiKeyFromEmail(inbox) {
    try {
        const EMAIL_BODY = await retrieveBodyFromEmail(inbox);
        await createApiKey(extractLink(EMAIL_BODY));
        const EMAIL_API_KEY = await retrieveBodyFromEmail(inbox);
        return extractApiKey(EMAIL_API_KEY);
    } catch (err) {
        console.error("❌ Error in retrieveApiKeyFromEmail:", err.message);throw err;}
}

async function retrieveBodyFromEmail(inbox) {
    const mailslurp = new MailSlurp({ apiKey: Data.EMAIL_API_KEY });
    let email = null;
    const timeout = Date.now() + 80000;
    while (!email && Date.now() < timeout) {
        try {
            email = await mailslurp.waitForLatestEmail(inbox.id, 5000);
        } catch (error) {
            console.log("🔄 Email not found, retrying...");
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    if (!email) {
        console.error("⛔ Email not received after several attempts.");
        throw new Error("Could not find email.");
    }
    try {
        await mailslurp.deleteEmail(email.id);
    } catch (err) {console.warn("⚠️ Email could not be deleted:", err.message);}

    console.log(`📩 Email received: ${email.subject}`);
    return email.body;
}


async function createApiKey(link){
    try {
        const response = await axios.get(link[1]);
        return response.data;

    } catch (error) {
        console.error("❌ Error:", error.message); throw new Error("Failed trying to retrieve API Key from link.");
    }
}

function extractLink(text){
    const regex = /a href='([^']+)'/;
    return text.match(regex);
}

function extractApiKey(text){
    const regex = /'>([^']+)<\/textarea/;
    return text.match(regex[1]);
}


module.exports = {validateCaptcha, createEmail, retrieveApiKeyFromEmail, retrieveBodyFromEmail, createApiKey, extractApiKey};
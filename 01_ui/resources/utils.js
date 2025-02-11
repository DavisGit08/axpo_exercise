// Utilities to help on UI
import { MailSlurp } from "mailslurp-client";
import Data from "./data/data";
import axios from "axios";

async function validateCaptcha(page){
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
    } else {
        console.error("No se pudo obtener el boundingBox del recaptcha.");
    }
    await new Promise(resolve => setTimeout(resolve,1000));
}

async function createEmail(){
    try{
        console.log(Data.EMAIL_API_KEY);
        const mailslurp = new MailSlurp({ apiKey: "e46cf67ee4b1ee2f5dd7c8f21c64c8a1c486510cf70d387dc8a5ce8f41b938ca" });
        const inbox = await mailslurp.inboxController.createInboxWithDefaults();
        return inbox;
    }catch(err){console.log(err)}
   
}

async function retrieveApiKeyFromEmail(inbox){
    const EMAIL_BODY = await this.retrieveBodyFromEmail(inbox);
    await this.createApiKey(extractLink(EMAIL_BODY));
    const EMAIL_API_KEY = await this.retrieveBodyFromEmail(inbox);
    return extractApiKey(EMAIL_API_KEY);
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
    if (!email) {throw new Error("⛔ Email not found.");}
    await mailslurp.deleteEmail(email.id);

    console.log(`📩 Email received: ${email.subject}`);
    return email.body;
}


async function createApiKey(link){
    try {
        const response = await axios.get(link[1]);
        return response.data;

    } catch (error) {
        console.error("❌ Error:", error.message);
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
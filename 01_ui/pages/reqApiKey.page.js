// AEMET page components
import {expect} from '@playwright/test';
import data from '../resources/data/data.js';
import utils from '../resources/utils.js';


export default class ReqApiPage{
    //----------------------------- Elements from ReqApiPage
    static BUTTON_SUBMIT(page){ return page.locator('button:text("Enviar")');}
    static INPUT_EMAIL(page){ return page.locator('#email');}
    static LABEL_CONFIRMED(page){ return page.locator('span:text("Su petición ha sido enviada, recibirá un correo de confirmación.');}

    //----------------------------- Components from ReqApiPage

    static async userRegistration(page){
        // Delete all inbox emails
        await utils.deleteAllEmails();
        // Fill data
        await this.INPUT_EMAIL(page).fill(data.EMAIL_ADDRESS);
        await this.validateCaptcha(page);
        await this.BUTTON_SUBMIT(page).click();
        await expect(page.locator('span:has-text("Su petición ha sido enviada")')).toBeVisible();
        console.log('Clicked over "Enviar" button');
        // Retrieve API Key from email process
        const API_KEY = await utils.retrieveApiKeyFromEmail();
        console.log(`✅ Api Key retrieved from email: ${API_KEY}`);
    }

    static async validateCaptcha(page) {
        try {
            const FRAME = await page.frameLocator('iframe[title="reCAPTCHA"]');
            const CHECKBOX = FRAME.locator('#recaptcha-anchor');
            await CHECKBOX.waitFor({ state: 'visible' });
            const BOX = await CHECKBOX.boundingBox();
            if (!BOX) {throw new Error('❌ Couldnt retrievew boundingBox reCAPTCHA.');}
            console.log('Found Captcha, trying user simulation...');
            await page.mouse.move(BOX.x + Math.random() * BOX.width, BOX.y + Math.random() * BOX.height);
            await page.waitForTimeout(Math.random() * 500 + 300);
            await page.mouse.move(BOX.x + BOX.width / 2, BOX.y + BOX.height / 2, { steps: 10 });
            await page.waitForTimeout(Math.random() * 500 + 300);
            await CHECKBOX.hover();
            await page.waitForTimeout(Math.random() * 500 + 300);
            await page.mouse.down();
            await page.waitForTimeout(Math.random() * 150 + 100);
            await page.mouse.up();
            console.log('Captcha marked...');
            await page.waitForTimeout(1000);
            let isChecked = await CHECKBOX.getAttribute('aria-checked');
            if (isChecked === 'true'){console.log("🟢 CAPTCHA validated successfully."); return;}
            else{  
                for (let i = 0; i<59; i++){
                    isChecked = await CHECKBOX.getAttribute('aria-checked');
                    if (isChecked === 'true'){console.log("🟢 CAPTCHA validated successfully."); break;}
                    if (i == 60){throw new Error('❌ Captcha not resolved in 60 seconds.');}
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        } catch (err) {
            console.error("❌ Error validando Captcha:", err.message);
            throw err;
        }
    }

    static async validateUserRegistration(page){
        await expect(this.INPUT_EMAIL(page)).toBeVisible();
        await expect(this.BUTTON_SUBMIT(page)).toBeVisible();
        console.log('User Registration elements validated');
    }
}

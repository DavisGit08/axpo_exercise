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
        await utils.deleteAllEmails();
        await this.INPUT_EMAIL(page).fill(data.EMAIL_ADDRESS);
        await this.validateCaptcha(page);
        await this.BUTTON_SUBMIT(page).click();
        await expect(page.locator('span:has-text("Su petición ha sido enviada")')).toBeVisible();
        console.log('Clicked over "Enviar" button');
        const API_KEY = await utils.retrieveApiKeyFromEmail();
        console.log(`✅ Api Key retrieved from email: ${API_KEY}`);
    }

    static async validateCaptcha(page) {
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
            let isChecked = await checkbox.getAttribute('aria-checked');
            if (isChecked === 'true'){console.log("🟢 CAPTCHA validated successfully."); return;}
            else{ // Captcha image is showed. Cannot be validated automatically. It will stop here in debug mode and wait must be implemented if run mode   
                for (let i = 0; i<59; i++){
                    isChecked = await checkbox.getAttribute('aria-checked');
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

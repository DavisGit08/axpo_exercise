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
        await utils.validateCaptcha(page);
        await this.BUTTON_SUBMIT(page).click();
        await expect(page.locator('span:has-text("Su petición ha sido enviada")')).toBeVisible();
        console.log('Clicked over "Enviar" button');
        const API_KEY = await utils.retrieveApiKeyFromEmail();
        console.log(`✅ Api Key retrieved from email: ${API_KEY}`);
    }

    static async validateUserRegistration(page){
        await expect(this.INPUT_EMAIL(page)).toBeVisible();
        await expect(this.BUTTON_SUBMIT(page)).toBeVisible();
        console.log('User Registration elements validated');
    }
}

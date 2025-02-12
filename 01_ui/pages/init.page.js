// AEMET page components
import {expect} from '@playwright/test';
import data from '../resources/data/data.js';
import reqApiKey from './reqApiKey.page.js';


export default class InitPage{
    //----------------------------- Elements from InitPage
    static BUTTON_SOLICITAR(page){ return page.locator('button:text("Solicitar")');}

    //----------------------------- Components from InitPage

    static async openAemet(page){
        for (let attempt = 1; attempt <= 5; attempt++) {
            try{
                // Open page
                await page.goto(data.URL, {timeout: 10000});
                console.log('Page loaded successfully: ' + data.URL);
                break;
            }catch(err){
                // If filed, try again
                console.error("Error trying to open page: " + err)
                if (attempt < 5) {
                    console.log("🔄 Retrying again...");
                    await page.waitForTimeout(100);
                } else {
                    throw new Error("🚨 Could not open AEMET after 5 retries to open AEMET website.");
                }
            }
        }
    }

    static async requestApiKey(page){
        await this.BUTTON_SOLICITAR(page).click();
        console.log('Clicked over "Solicitar" button');
        await reqApiKey.validateUserRegistration(page);
    }
}
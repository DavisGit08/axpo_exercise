// AEMET page components
import {expect} from '@playwright/test';
import data from '../resources/data/data.js';
import reqApiKey from './reqApiKey.page.js';


export default class InitPage{
    //----------------------------- Elements from InitPage
    static BUTTON_SOLICITAR(page){ return page.locator('button:text("Solicitar")');}

    //----------------------------- Components from InitPage

    static async openAemet(page){
        await page.goto(data.URL);
        console.log('Opened browser and page opened: ' + data.URL);
    }

    static async requestApiKey(page){
        await this.BUTTON_SOLICITAR(page).click();
        console.log('Clicked over "Solicitar" button');
        await reqApiKey.validateUserRegistration(page);
    }
}
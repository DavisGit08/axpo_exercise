// UI tests workflows

import initPage from '../01_ui/pages/init.page.js';
import reqApiKey from '../01_ui/pages/reqApiKey.page.js';
import {test} from '@playwright/test';
import '../01_ui/resources/hooks.js';
import utils from '../01_ui/resources/utils.js';


//·H·A·P·P·Y· ·P·A·T·H·S·
test('UI User Registration - E2E', async({page}, testInfo) => {
    await utils.title(testInfo.title)
    await initPage.openAemet(page);
    await initPage.requestApiKey(page);
    await reqApiKey.userRegistration(page);
});

test.skip('UI Main page', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration page', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Retrieving email: Petición generación API Key servicio AEMET OpenData', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Retrieving email: Alta en el servicio AEMET OpenData', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Opening link to retrieve API Key data', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});


//·R·A·I·N·Y· ·P·A·T·H·S·
test.skip('UI User Registration - Empty email', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Captcha not checked', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Wrong email', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Blocked IP because of many requests', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

test.skip('UI User Registration - Session expired', async({page}, testInfo) => {
    // Test not developed because I have no time to work on this
});

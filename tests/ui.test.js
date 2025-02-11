// UI tests workflows

import initPage from '../01_ui/pages/init.page.js';
import reqApiKey from '../01_ui/pages/reqApiKey.page.js';
import {test} from '@playwright/test';

test('UI - open page', async({page}, testInfo) => {
    console.log(`#######T·E·S·T: ${testInfo.title}`);
    await aemetPage.openAemet(page);
});

test('UI - Request API Key page', async({page}, testInfo) => {
    console.log(`#######T·E·S·T: ${testInfo.title}`);
    await initPage.openAemet(page);
    await initPage.requestApiKey(page);
});

test('UI - User Registration', async({page}, testInfo) => {
    console.log(`#######T·E·S·T: ${testInfo.title}`);
    await initPage.openAemet(page);
    await initPage.requestApiKey(page);
    await reqApiKey.userRegistration(page);
});


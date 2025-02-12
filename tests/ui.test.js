// UI tests workflows

import initPage from '../01_ui/pages/init.page.js';
import reqApiKey from '../01_ui/pages/reqApiKey.page.js';
import {test} from '@playwright/test';
import '../01_ui/resources/hooks.js';
import utils from '../01_ui/resources/utils.js';


test('UI - User Registration', async({page}, testInfo) => {
    await utils.title(testInfo.title)
    await initPage.openAemet(page);
    await initPage.requestApiKey(page);
    await reqApiKey.userRegistration(page);
});


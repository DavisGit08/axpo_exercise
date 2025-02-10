// Hooks for API

import {test} from '@playwright/test';
import { setTestInfo } from './utils';

test.beforeEach(async({}, testInfo) => {
    setTestInfo(testInfo);
});
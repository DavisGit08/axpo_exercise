// AEMET apis page

import apis from '../apis/antartida.apis';
import {expect} from '@playwright/test';
import utils from '../resources/utils.js';
const expectedDatos = require('../resources/responses/datos.json');
const expectedAntartida = require('../resources/responses/antartida.json');


export default class AntartidaServices{
    static async getAntartida(fechaini, fechafin, estacion, respCode){
        // Call getAntartida endpoint
        const RESP = await apis.getAntartida(fechaini, fechafin, estacion);
        // Validate response status code
        expect(RESP.status).toEqual(respCode);
        // Validate response date
        const UTC_TIME = utils.getUtcTime();
        const REQ_SECS = utils.convertUtcTimeToSecs(RESP.headers.date);
        const RESP_SECS = utils.convertUtcTimeToSecs(UTC_TIME);
        const timeDifference = Math.abs(REQ_SECS - (RESP_SECS));
        expect(timeDifference).toBeLessThanOrEqual(2);
        expect(RESP.headers.date.replace(utils.getTimeFromUTCString(RESP.headers.date), '')).toEqual(UTC_TIME.replace(utils.getTimeFromUTCString(UTC_TIME), ''));
        // Validate response body structure
        const RESP_DATA = Object.keys(RESP.data);
        const EXP_DATA = Object.keys(expectedAntartida);
        expect(RESP_DATA.sort()).toEqual(EXP_DATA.sort());
        console.log(`✅ ${RESP_DATA.length} total items validated in response body.`);

        // Call JSON data endpoint
        const RESP_JSON = await apis.getJson(RESP.data.datos);
        const EXP_JSON = Object.keys(expectedDatos);
        // Validate JSON data status code + response keys
        expect(RESP_JSON.status).toEqual(200);
        RESP_JSON.data.forEach((item) => {
            const RESP_KEYS = Object.keys(item).sort();
            const EXP_KEYS = EXP_JSON.sort();
            expect(RESP_KEYS).toEqual(EXP_KEYS);
        });
        console.log(`✅ ${RESP_JSON.data.length} total items validated in JSON.`);
    }
}
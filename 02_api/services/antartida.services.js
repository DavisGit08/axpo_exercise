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
        // Validate response date
        this.validateRespData(RESP, 200);
        // Validate response body structure
        this.validateRespBodyStructure(RESP.data, expectedAntartida);
        // Call JSON data endpoint
        const RESP_JSON = await apis.getJson(RESP.data.datos);
        // Validate JSON data status code + response keys
        this.validateJsonData(expectedDatos, RESP_JSON, 200);
    }

    static validateRespData(resp, statusCode){
        expect(resp.status).toEqual(statusCode);
        console.log(`✅ Status code ${statusCode} in response data.`);
        const UTC_TIME = utils.getUtcTime();
        const REQ_SECS = utils.convertUtcTimeToSecs(resp.headers.date);
        const RESP_SECS = utils.convertUtcTimeToSecs(UTC_TIME);
        const timeDifference = Math.abs(REQ_SECS - (RESP_SECS));
        expect(timeDifference).toBeLessThanOrEqual(2);
        expect(resp.headers.date.replace(utils.getTimeFromUTCString(resp.headers.date), '')).toEqual(UTC_TIME.replace(utils.getTimeFromUTCString(UTC_TIME), ''));
    }

    static validateRespBodyStructure(resp, expected){
        const RESP_DATA = Object.keys(resp);
        const EXP_DATA = Object.keys(expected);
        expect(RESP_DATA.sort()).toEqual(EXP_DATA.sort());
        console.log(`✅ ${RESP_DATA.length} total items validated in response body structure.`);
    }

    static validateJsonData(expected, resp, statusCode){
        const EXP_JSON = Object.keys(expected);
        expect(resp.status).toEqual(statusCode);
        console.log(`✅ Status code ${statusCode} in JSON data.`);
        resp.data.forEach((item) => {
            const RESP_KEYS = Object.keys(item).sort();
            const EXP_KEYS = EXP_JSON.sort();
            expect(RESP_KEYS).toEqual(EXP_KEYS);
        });
        console.log(`✅ ${resp.data.length} total items validated in JSON structure.`);
    }
}
// AEMET apis page

import apis from '../apis/antartida.apis';
import {expect} from '@playwright/test';
import utils from '../resources/utils.js';
const expectedDatos = require('../resources/responses/datos.json');
const expectedAntartida = require('../resources/responses/antartida.json');


export default class AntartidaServices{
    static async getAntartidaHappyPath(fechaini, fechafin, estacion){
        // Call getAntartida endpoint
        const RESP = await apis.getAntartida(fechaini, fechafin, estacion);
        // Validate response date + status code
        this.validateRespData(RESP, 200);
        // Validate response body structure
        this.validateRespBodyStructure(RESP.data, expectedAntartida);
        // Call JSON data endpoint
        const RESP_JSON = await apis.getJson(RESP.data.datos);
        // Validate JSON data response keys + status code
        this.validateJsonData(expectedDatos, RESP_JSON, 200);
        // Validate realistic data
        this.validateJsonRealisticData(RESP_JSON);
    }

    static async getAntartidaNoData(fechaini, fechafin, estacion, respCode, msg){
        // Call getAntartida endpoint
        const RESP = await apis.getAntartida(fechaini, fechafin, estacion);
        // Validate response date + status code
        this.validateNoRespData(RESP, msg, respCode);
    }

    static async getAntartidaUnauthorized(fechaini, fechafin, estacion, respCode){
        // Call getAntartida endpoint
        const RESP = await apis.getAntartidaErrorCodes(fechaini, fechafin, estacion, 'apiKeyInvented');
        // Validate Unauthorized
        expect(RESP.status).toEqual(respCode)
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

    static validateNoRespData(resp, msg, statusCode){
        expect(resp.status).toEqual(statusCode);
        console.log(`✅ Status code ${statusCode} in response data.`);
        expect(resp.data.descripcion).toEqual(msg);
        expect(resp.data.estado).toEqual(404);
        console.log(`✅ Expected error message '${msg}' and Status ${resp.data.estado} in response data.`);
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

    static validateJsonRealisticData(resp){
        resp.data.forEach((item) => {
            const {temp, pres, vel} = item;
            expect(temp).toBeGreaterThanOrEqual(-90);
            expect(temp).toBeLessThanOrEqual(20);
            expect(pres).toBeGreaterThanOrEqual(0);
            expect(pres).toBeLessThanOrEqual(1500);
            expect(vel).toBeGreaterThanOrEqual(0);
            expect(vel).toBeLessThanOrEqual(200);
        });
        console.log(`✅ JSON data for temperatura, presion and viento is realistic for ${resp.data.length} elements (REQUIREMENT BONUS).`);
    }
}
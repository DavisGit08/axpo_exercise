// API tests workflows

import {test} from '@playwright/test';
import services from '../services/antartida.services.js';

//·H·A·P·P·Y· ·P·A·T·H·
[   {fechaini: '2022-12-01T10:00:00UTC', fechafin: '2022-12-04T10:00:00UTC', estacion: '89064', respCode: 200},
    {fechaini: '2022-12-01T10:00:00UTC', fechafin: '2022-12-01T12:00:00UTC', estacion: '89064R', respCode: 200},
    {fechaini: '2007-03-06T10:00:00UTC', fechafin: '2007-03-07T10:30:11UTC', estacion: '89064RA', respCode: 200},
    {fechaini: '2022-12-31T10:00:00UTC', fechafin: '2023-01-01T10:00:00UTC', estacion: '89070', respCode: 200},
].forEach(({fechaini, fechafin, estacion, respCode}) => {
    test(`Antartida - Correct data for estacion ${estacion}`, async({}, testInfo) => {
        console.log(`#######T·E·S·T: ${testInfo.title}`)
        await services.getAntartida(fechaini, fechafin, estacion, respCode);
    });
});



//·R·A·I·N·Y· ·P·A·T·H·


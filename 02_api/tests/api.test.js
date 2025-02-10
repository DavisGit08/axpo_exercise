// API tests workflows
import {test} from '@playwright/test';
import services from '../services/antartida.services.js';

//·H·A·P·P·Y· ·P·A·T·H·S·
[   {fechaini: '2022-12-01T10:00:00UTC', fechafin: '2022-12-03T10:00:00UTC', estacion: '89064', respCode: 200},
    {fechaini: '2022-12-01T10:00:00UTC', fechafin: '2022-12-01T12:00:00UTC', estacion: '89064R', respCode: 200},
    {fechaini: '2007-03-06T10:00:00UTC', fechafin: '2007-03-07T10:30:11UTC', estacion: '89064RA', respCode: 200},
    {fechaini: '2022-12-31T10:00:00UTC', fechafin: '2023-01-01T10:00:00UTC', estacion: '89070', respCode: 200},
].forEach(({fechaini, fechafin, estacion, respCode}) => {
    test(`API Antartida - Correct data for station ${estacion}`, async({}, testInfo) => {
        console.log(`#######T·E·S·T: ${testInfo.title}`)
        await services.getAntartidaHappyPath(fechaini, fechafin, estacion, respCode);
    });
});



//·R·A·I·N·Y· ·P·A·T·H·S·
[   {fechaini: '2024-12-01T10:00:00UTC', fechafin: '2024-12-04T10:00:00UTC', estacion: '89064', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'correct'},
    {fechaini: '2024-12-01T10:00:00UTC', fechafin: '2024-12-01T12:00:00UTC', estacion: '89064R', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'correct'},
    {fechaini: '2008-03-06T10:00:00UTC', fechafin: '2008-03-07T10:30:11UTC', estacion: '89064RA', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'correct'},
    {fechaini: '2024-12-31T10:00:00UTC', fechafin: '2025-01-01T10:00:00UTC', estacion: '89070', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'correct'},
    {fechaini: '3024-12-01T10:00:00UTC', fechafin: '3024-12-04T10:00:00UTC', estacion: '89064', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'future'},
    {fechaini: '3024-12-01T10:00:00UTC', fechafin: '3024-12-01T12:00:00UTC', estacion: '89064R', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'future'},
    {fechaini: '3008-03-06T10:00:00UTC', fechafin: '3008-03-07T10:30:11UTC', estacion: '89064RA', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'future'},
    {fechaini: '3024-12-31T10:00:00UTC', fechafin: '3025-01-01T10:00:00UTC', estacion: '89070', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'future'},
    {fechaini: '2024-12-31T10:00:00UTC', fechafin: '2025-01-01T10:00:00UTC', estacion: '666666', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'correct'},
    {fechaini: '3024-12-31HELLOBUDDY', fechafin: ':)', estacion: '89070', respCode: 200, msg: 'No hay datos que satisfagan esos criterios', data:'incorrect'},
].forEach(({fechaini, fechafin, estacion, respCode, msg, data}) => {
    test(`API Antartida (Rainy path) - No data for station ${estacion} with ${data} data`, async({}, testInfo) => {
        console.log(`#######T·E·S·T: ${testInfo.title}`)
        await services.getAntartidaNoData(fechaini, fechafin, estacion, respCode, msg);
    });
});

[
    {fechaini: '2024-10-01T10:00:00UTC', fechafin: '2024-12-04T10:00:00UTC', estacion: '89064', respCode: 200, msg: 'El rango de fechas no puede ser superior a 1 mes'},
    {fechaini: '2024-10-01T10:00:00UTC', fechafin: '2024-12-01T12:00:00UTC', estacion: '89064R', respCode: 200, msg: 'El rango de fechas no puede ser superior a 1 mes'},
    {fechaini: '2008-01-06T10:00:00UTC', fechafin: '2008-03-07T10:30:11UTC', estacion: '89064RA', respCode: 200, msg: 'El rango de fechas no puede ser superior a 1 mes'},
    {fechaini: '2024-11-31T10:00:00UTC', fechafin: '2024-01-01T10:00:00UTC', estacion: '89070', respCode: 200, msg: 'El rango de fechas no puede ser superior a 1 mes'}
].forEach(({fechaini, fechafin, estacion, respCode, msg}) => {
    test(`API Antartida (Rainy path) - Data range exceeded for station ${estacion}`, async({}, testInfo) => {
        console.log(`#######T·E·S·T: ${testInfo.title}`)
        await services.getAntartidaNoData(fechaini, fechafin, estacion, respCode, msg);
    });
});

test(`API Antartida (Rainy path) - 401 Unauthorized call`, async({}, testInfo) => {
    console.log(`#######T·E·S·T: ${testInfo.title}`)
    await services.getAntartidaUnauthorized('2022-12-01T10:00:00UTC', '2022-12-04T10:00:00UTC', '89064', 401);
});

test(`API Antartida (Rainy path) - 404 Empty fields`, async({}, testInfo) => {
    console.log(`#######T·E·S·T: ${testInfo.title}`)
    await services.getAntartidaUnauthorized('', '', '', 404);
});
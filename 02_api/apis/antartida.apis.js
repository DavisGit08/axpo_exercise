// AEMET Antartida Services

const assert = require('assert');
const axios = require('axios');
import data from '../resources/data/data.js';

export default class AntartidaApis{
    static async getAntartida(fechaini, fechafin, estacion){
        try{
            const RESPONSE = await axios.get(data.ENDPOINT + `/fechaini/${fechaini}/fechafin/${fechafin}/estacion/${estacion}`,{
                headers:{
                    'accept': 'application/json',
                    'api_key': data.API_KEY
                }
            });
            return RESPONSE;
        }catch(err){console.log(err); throw new Error('Error: ' + err);}
    }

    static async getJson(url){
        try{
            const RESPONSE = await axios.get(url,{
                headers:{
                    'accept': 'application/json'
                }
            });
            return RESPONSE;
        }catch(err){console.log(err); throw new Error('Error: ' + err);}
    }
}
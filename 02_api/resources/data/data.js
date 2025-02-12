// Data to be used for API tests
import crypto from 'crypto';
import utils from '../utils.js';

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.scryptSync('Davis8', 'sal', 32);
export default class Data{
    //static API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZC5wZXJlei5jYW1wb3M4MkBnbWFpbC5jb20iLCJqdGkiOiJlZDgyNTI3MC03YzhmLTQ0Y2YtOTdkYS05YTRiZmVhODA1MGQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTczOTE5NTIyNCwidXNlcklkIjoiZWQ4MjUyNzAtN2M4Zi00NGNmLTk3ZGEtOWE0YmZlYTgwNTBkIiwicm9sZSI6IiJ9.bizoojJkulafRr1Cy_lb5b_uwC0cPiWDsGmORTNF1gI';
    static ENCRYPTED_API_KEY = '3a20fa720fdae7d6fbea6e96d659756b:32290294b149ae1deb657e10cc4eb0f9d923f7d0df5c7006424edd460e829ffdfb909af7b1dafabc74c46ba7d4bf8f127e284e0fff4f2049d1eec68044622836c2449e118acc6b2b64f55efa3f000500b6af8dcacf0f8811bdd391fa3c9a11d871041c2927159fc7e2440fb7c159dc979f9ad5a12dea0f6576fb3d60b356d7cae00d48fd073023fba709386a11834f5dee3def3c28c8c963e7500c3972b49390a95df9b370f6cb4cd7ccc39542dc70aa7afa6ca8f4a62f74ce09f2cb836fbcc30296e825a9e7154f766d0798a6453ad4c5e139bce02a797c744967001c04b85519a5cd46a75c683a3480ae2f632c89bc5c9bf326de92f6edafe4a86ac175a1abb9de38ddcf1b754578f9418e340d61a24fbc04a3dde8e1cee6a63385f2a275d521c245576985217a4193ad1c3e7e7860'; // Reemplázalo con la salida del script anterior
    static ENDPOINT = 'https://opendata.aemet.es/opendata/api/antartida/datos';
    static get API_KEY() {
        return utils.decrypt(this.ENCRYPTED_API_KEY, ALGORITHM, KEY);
    }
}

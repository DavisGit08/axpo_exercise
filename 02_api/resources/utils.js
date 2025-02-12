// Utilities to help on API
import crypto from 'crypto';

function setTestInfo(testInfo){
    global.globalTestInfo = testInfo;
}

function getTestInfo(){
    return global.globalTestInfo;
}

function getUtcTime(){
    const date = new Date().toUTCString();
    return date;
}

function convertUtcTimeToSecs(dateString){
    const date = new Date(dateString);
    return date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds();
}

const getTimeFromUTCString = (utcString) => {
    const date = new Date(utcString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

function title(text){
    console.log(`#######T·E·S·T: ${text}`);
}

function encrypt(){// AES encrypt
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZC5wZXJlei5jYW1wb3M4MkBnbWFpbC5jb20iLCJqdGkiOiJlZDgyNTI3MC03YzhmLTQ0Y2YtOTdkYS05YTRiZmVhODA1MGQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTczOTE5NTIyNCwidXNlcklkIjoiZWQ4MjUyNzAtN2M4Zi00NGNmLTk3ZGEtOWE0YmZlYTgwNTBkIiwicm9sZSI6IiJ9.bizoojJkulafRr1Cy_lb5b_uwC0cPiWDsGmORTNF1gI';
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync('Davis8', 'sal', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(`Encrypted key: ${iv.toString('hex')}:${encrypted}`);
}

function decrypt(encryptedApiKey, algorithm, key) {
    const [ivHex, encrypted] = encryptedApiKey.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  
    return decrypted;
}

module.exports = {setTestInfo, getTestInfo, getUtcTime, convertUtcTimeToSecs, getTimeFromUTCString, title, encrypt, decrypt};
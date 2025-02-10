// Utilities to help on API

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

module.exports = {setTestInfo, getTestInfo, getUtcTime, convertUtcTimeToSecs, getTimeFromUTCString};
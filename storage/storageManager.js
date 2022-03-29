const fs = require('fs');

function checkFileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function readJSON(filePath) {
try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    } catch (error) {
        console.log(error)
    }
}

function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    checkFileExists,
    readJSON,
    writeJSON
}
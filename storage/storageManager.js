const fs = require('fs');

function checkFileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function checkDirExists(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
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

//check forum folder
if(!checkDirExists('./storage/forums')){
    fs.mkdirSync('./storage/forums');
}

//check users folder
if(!checkDirExists('./storage/users')){
    fs.mkdirSync('./storage/users');
}

// create json file for each forum in "forums-config"
readJSON('storage/forums-config.json').forums.forEach(forum => {
    try {
        if(!checkFileExists('storage/forums' + forum + '/forum-config.json', [])) {
            fs.mkdirSync('storage/forums' + forum);
            writeJSON('storage/forums' + forum + '/forum-config.json', []);
        }
    } catch (error) {
        console.log('file does not exist');
    }
});

//json read directory
function readDir(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        return files;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkFileExists,
    readJSON,
    writeJSON,
    readDir
}
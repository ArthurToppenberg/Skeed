const storageManager = require('../storage/storageManager');

function validate(username, password) {
    //check if account exists
    if (storageManager.checkFileExists(`./storage/users/${username}.json`)) {
        //check if password is correct
        const user = storageManager.readJSON(`./storage/users/${username}.json`);
        if (user.password === password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = validate;
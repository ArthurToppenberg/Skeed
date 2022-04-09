const storageManager = require('../storage/storageManager');

function validate(username, password, password_confirmation) {
    //check if username is already in use
    if (!storageManager.checkFileExists(`./storage/users/${username}.json`) 
    && username !== '' 
    && password !== '' 
    && password_confirmation !== '' 
    && password === password_confirmation
    && password.length >= 3
    && password.length <= 100
    && username.length >= 3
    && username.length <= 256
    && username.match(/^[a-zA-Z0-9]+$/) //check only valid characters are entered
    && username !== 'Guest'
    && username !== 'admin'
    && username !== 'guest'
    && username !== 'administrator'
    ) {
        storageManager.writeJSON(`./storage/users/${username}.json`, {
            username: username,
            password: password
        });
        return true;
    } else {
        return false;
    }
}

module.exports = validate;
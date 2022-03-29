const storageManager = require('../storage/storageManager');

function validate(username) {
    //check if username is already in use
    const users = storageManager.readJSON('users.json');
    const user = users.find(user => user.username === username);
    if (user) {
        return false;
    }
    return true;
}

module.exports = validate;
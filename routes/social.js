var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');
const storageManager = require('../storage/storageManager');

/* GET users listing. */
router.get('/getinfo', function(req, res, next) {
    //validate user
    if(validateSession(req)){
        res.json({
            status: '',
            username: req.session.username,
            following: storageManager.readJSON('storage/users/' + req.session.username + '.json').following,
            followers: storageManager.readJSON('storage/users/' + req.session.username + '.json').followers
        });
    }else{
        res.json({status: 'login to use social hub'});
    }
});

router.post('/searchfreinds', function(req, res, next) {
    //validate user
    if(validateSession(req)){

        //get inputed username
        var inputedUsername = req.body.inputedUsername;

        //if inputed username is not empty
        if (inputedUsername != "") {
            //get all users from storage/users
            const allUsersJSON = storageManager.readDir('storage/users');
            const allUsers = [];
            
            //create array with all usernames
            allUsersJSON.forEach(userJSON => {
                allUsers.push(storageManager.readJSON('storage/users/' + userJSON).username);
            });

            const numberOfMatches = 4;
            var closestMatches = [];
            allUsers.forEach(user => {
                if(closestMatches.length < numberOfMatches){
                    //check if inputed username is in user and user is not already freinds
                    if(
                        user.toLowerCase().indexOf(inputedUsername.toLowerCase()) != -1 &&
                        user != req.session.username &&
                        !storageManager.readJSON('storage/users/' + req.session.username + '.json').following.includes(user)
                    ){
                        closestMatches.push(user);
                    }
                }
            });

            res.json({
                status: '',
                closestMatches: closestMatches
            });
            
        }else{
            res.json({status: 'no username entered'});
        }

    }else{
        res.json({status: 'login to use social hub'});
    }
});

router.post('/addFreind', function(req, res, next) {
    //validate user
    if(validateSession(req)){
        //get inputed username
        const inputedUsername = req.body.username;

        //check user is not already following
        const following = storageManager.readJSON('storage/users/' + req.session.username + '.json');

        if(following.following.indexOf(inputedUsername) == -1){
            //add user to following
            following.following.push(inputedUsername);
            storageManager.writeJSON('storage/users/' + req.session.username + '.json', following);

            //add user to followers
            const followers = storageManager.readJSON('storage/users/' + inputedUsername + '.json');
            followers.followers.push(req.session.username);
            storageManager.writeJSON('storage/users/' + inputedUsername + '.json', followers);

            res.json({
                status: ''
            });
        }else{
            res.json({
                status: 'already following'
            });
        }

    }else{
        res.json({status: 'login to use social hub'});
    }
});

router.post('/unfollow', function(req, res, next) {
    //validate user
    if(validateSession(req)){
        //get username to unfolow
        const usernameToUnfollow = req.body.follower;

        //check user is following
        const following = storageManager.readJSON('storage/users/' + req.session.username + '.json');

        if(following.following.indexOf(usernameToUnfollow) != -1){
            //remove user from following
            following.following.splice(following.following.indexOf(usernameToUnfollow), 1);
            storageManager.writeJSON('storage/users/' + req.session.username + '.json', following);

            //remove user from followers
            const followers = storageManager.readJSON('storage/users/' + usernameToUnfollow + '.json');
            followers.followers.splice(followers.followers.indexOf(req.session.username), 1);
            storageManager.writeJSON('storage/users/' + usernameToUnfollow + '.json', followers);

            //send status and followers
            res.json({
                status: '',
                following: storageManager.readJSON('storage/users/' + req.session.username + '.json').following
            });
        }else{
            res.json({
                status: 'not following'
            });
        }
    }else{
        res.json({status: 'login to use social hub'});
    }
});

router.get('/following', function(req, res, next) {
    //validate user
    if(validateSession(req)){
        //get all following from user
        const following = storageManager.readJSON('storage/users/' + req.session.username + '.json').following;
        res.json({
            status: '',
            following: following
        });
    }
});

router.get('/followers', function(req, res, next){
    //validate user
    if(validateSession(req)){
        //get all followers from user
        const followers = storageManager.readJSON('storage/users/' + req.session.username + '.json').followers;

        //if user is not following follower
        const following = storageManager.readJSON('storage/users/' + req.session.username + '.json').following;
        const notFollowingBack = [];
        followers.forEach(follower => {
            if(following.indexOf(follower) == -1){
                notFollowingBack.push(follower);
            }
        });

        res.json({
            status: '',
            followers: followers,
            notFollowingBack: notFollowingBack
        });
    }
});

module.exports = router;
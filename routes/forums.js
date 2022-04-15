var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');
const storageManager = require('../storage/storageManager');

const forums = storageManager.readJSON('storage/forums-config.json').forums;

router.get('/allForums', function(req, res, next) {
    res.json({forums: forums});
});

//dynamicaly create rules for each forum
forums.forEach(forum => { 
        //create a new route for each forum
    router.get(forum, function(req, res, next) {
            //if username is not logged in
        if(validateSession(req)){
            req.session.forum = forum;
            res.render('forum', { 
            title: forum,
            logo: '../images/logo_transparent.png',
            settingsIcon: '../images/settingsIcon.png',
            page: forum,
            username: req.session.username,
            authenticated: true
            });
        }else{
            req.session.forum = forum;
            res.render('forum', { 
            title: forum,
            logo: '../images/logo_transparent.png',
            settingsIcon: '../images/settingsIcon.png',
            page: forum,
            username: "Guest",
            authenticated: false
            });
        }
    });
});

//create new thread in forum
router.post('/newThread', function(req, res, next) {
        //get the forum name
        const forum = req.session.forum;
        //get the thread title
        const title = req.body.title;
        //get the thread content
        const content = req.body.content;
        //get the thread date
        const date = new Date();
        //get the thread id
        const id = date.getTime();

        //create .json file for the thread
        var thread = {
            forum: forum,
            title: title,
            content: content,
            username: req.session.username,
            date: date,
            id: id,
            vote: 0,
            usersvote: [],
            comments: []
        };

        var titleValidation = false;
        var contentValidation = false;
        var authorValidation = false;

        if(title != ''){
            titleValidation = true;
        }
        if(content != '' && content != '<p><br></p>' && content.length > 10 && content.length < 1000){
            contentValidation = true;
        }

        //if the author is not the same as the session username
        if(req.session.username != undefined){
            authorValidation = true;
        }

        res.json({
            title: titleValidation,
            content: contentValidation,
            username: authorValidation
        });

        if(titleValidation && contentValidation && authorValidation){
            //save .json file
            storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', thread);
        }
});

//get all threads in forum
router.post('/getThreads', function(req, res, next) {
        //config ----
        const threadChunkSize = 5;
        //-----

        var json = [];
        //get the forum name
        const forum = req.session.forum;
        //get all the threads in the forum
        const threads = storageManager.readDir('storage/forums' + forum);
        //get thread chuck (a number of threads)
        const threadChunk = req.body.threadChunk;
        
        //remove config file from forum
        threads.pop();

        //sort array with most votes at top
        threads.sort(function(a, b){
            return storageManager.readJSON('storage/forums' + forum + '/' + b).vote - storageManager.readJSON('storage/forums' + forum + '/' + a).vote;
        });

        var endReached = false;

        //send selected thread chuck to client
        for (let i = threadChunk*threadChunkSize; i < (threadChunk*threadChunkSize) + threadChunkSize; i++) {
            if(i < threads.length){
                const thread = threads[i];
                const data = storageManager.readJSON('storage/forums' + forum + '/' + thread);
                var uservote;
                if(req.session.username != undefined){
                    var votedUsernames = [];
                    data.usersvote.forEach(data => {
                        votedUsernames.push(data.username);
                    });
                    if(data.usersvote[votedUsernames.indexOf(req.session.username)] == undefined){
                        uservote = undefined;
                    }else{
                        uservote = data.usersvote[votedUsernames.indexOf(req.session.username)].vote;
                    }  
                }else{
                    uservote = 'guest';
                }
                json.push({
                    title: data.title,
                    content: data.content,
                    username: data.username,
                    date: data.date,
                    vote: data.vote,
                    id: data.id,
                    uservote: uservote,
                    comments: data.comments.length
                });
            }else{
                endReached = true;
            }   
        }
        if(validateSession(req)){
            res.json({threads: json, authenticated: true, endReached: endReached});
        }else{
            res.json({threads: json, authenticated: false, endReached: endReached});
        }
});

//up and downvote buttons for thread
router.post('/vote', function(req, res, next) {
    //validate
    if(validateSession(req)){
        //increase or decrease votes for thread
        const id = req.body.id;
        const vote = req.body.vote;
        const forum = req.session.forum;
        const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');
        var votedUsernames = [];
        data.usersvote.forEach(data => {
            votedUsernames.push(data.username);
        });
        //up or down vote and check if user has already voted
            if(vote == 'up' && !votedUsernames.includes(req.session.username)){ // has not voted and wants to vote up
                //increase vote
                data.vote++;
                //add username and vote to usersvote array
                data.usersvote.push({username : req.session.username, vote : 'up'});
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'down' && !votedUsernames.includes(req.session.username)){ // has not voted and wants to vote up
                //increase vote
                data.vote--;
                //add username and vote to usersvote array
                data.usersvote.push({username : req.session.username, vote : 'down'});
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'up' && data.usersvote[votedUsernames.indexOf(req.session.username)].vote == 'down'){
                //decrease vote
                data.vote++;
                //get index of username in usersvoted array
                const index = votedUsernames.indexOf(req.session.username);
                //remove username from usersvoted array and vote
                data.usersvote.splice(index, 1);
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data); 
            }
            else if(vote == 'down' && data.usersvote[votedUsernames.indexOf(req.session.username)].vote == 'up'){
                //decrease vote
                data.vote--;
                //get index of username in usersvoted array
                const index = votedUsernames.indexOf(req.session.username);
                //remove username from usersvoted array
                data.usersvote.splice(index, 1);
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }
        var votedUsernames = [];
        data.usersvote.forEach(data => {
            votedUsernames.push(data.username);
        });
        if(data.usersvote[votedUsernames.indexOf(req.session.username)] == undefined){
            res.json({votes: data.vote, uservote: undefined});
        }else{
            res.json({votes: data.vote, uservote: data.usersvote[votedUsernames.indexOf(req.session.username)].vote});
        } 
    }
}); 

//get comments in thread
router.post('/getComments', function(req, res, next) {
    //get thread comments
    const id = req.body.id;
    const forum = req.session.forum;
    const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');

    //in the future add some sorting of comments here
    if(validateSession(req)){
        res.json({comments: data.comments, validated: true});
    }else{
        res.json({comments: data.comments, validated: false});
    }
});

router.post('/newComment', function(req, res, next) {
    //validate user
    if(validateSession(req)){
        //get thread comments
        const id = req.body.id;
        const forum = req.session.forum;
        const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');

        if(true){
            //add comment to thread comments array
            data.comments.push({
                username: req.session.username,
                content: req.body.content,
                date: new Date()
            });

            //save comment to json file
            storageManager.writeJSON('storage/forums' + forum + '/' + req.body.id + '.json', data);

            res.json({"status": true});
        }else{
            res.json({"status": false});
        }

    }
});

module.exports = router;

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
            username: req.session.username
            });
        }else{
            req.session.forum = forum;
            res.render('forum', { 
            title: forum,
            logo: '../images/logo_transparent.png',
            settingsIcon: '../images/settingsIcon.png',
            page: forum,
            username: "Guest"
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
            usersvoted: [],
            uservote: []
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
router.get('/getThreads', function(req, res, next) {
        var json = [];
        //get the forum name
        const forum = req.session.forum;
        //get all the threads in the forum
        const threads = storageManager.readDir('storage/forums' + forum);
        
        //remove config file from forum
        threads.pop();

        console.log(threads);

        //sort array with most votes at top
        threads.sort(function(a, b){
            return storageManager.readJSON('storage/forums' + forum + '/' + b).vote - storageManager.readJSON('storage/forums' + forum + '/' + a).vote;
        });

        console.log(threads);

        //send each thread to the client
        threads.forEach(thread => {
            const data = storageManager.readJSON('storage/forums' + forum + '/' + thread);
            var uservote;
            if(req.session.username != undefined){
                uservote = data.uservote[data.usersvoted.indexOf(req.session.username)];
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
                    uservote: uservote
                    }
                );
            });

        res.json({threads: json});
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
        //up or down vote and check if user has already voted
            if(vote == 'up' && !data.usersvoted.includes(req.session.username)){ // has not voted and wants to vote up
                //increase vote
                data.vote++;
                //add username to usersvoted array
                data.usersvoted.push(req.session.username);
                //add vote value to uservote array
                data.uservote.push('up');
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'down' && !data.usersvoted.includes(req.session.username)){ // has not voted and wants to vote up
                //increase vote
                data.vote--;
                //add username to usersvoted array
                data.usersvoted.push(req.session.username);
                //add vote value to uservote array
                data.uservote.push('down');
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'up' && data.uservote[data.usersvoted.indexOf(req.session.username)] == 'down'){
                //decrease vote
                data.vote++;
                //get index of username in usersvoted array
                const index = data.usersvoted.indexOf(req.session.username);
                //remove username from usersvoted array
                data.usersvoted.splice(index, 1);
                //remove uservote from uservote array at same index
                data.uservote.splice(index, 1);
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data); 
            }else if(vote == 'down' && data.uservote[data.usersvoted.indexOf(req.session.username)] == 'up'){
                //decrease vote
                data.vote--;
                //get index of username in usersvoted array
                const index = data.usersvoted.indexOf(req.session.username);
                //remove username from usersvoted array
                data.usersvoted.splice(index, 1);
                //remove uservote from uservote array at same index
                data.uservote.splice(index, 1);
                //save thread
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }
        res.json({votes: data.vote, uservote: data.uservote[data.usersvoted.indexOf(req.session.username)]});
    }
}); 

module.exports = router;

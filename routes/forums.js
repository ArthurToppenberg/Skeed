var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');
const storageManager = require('../storage/storageManager');

const forums = storageManager.readJSON('storage/forums-config.json').forums;

router.get('/allForums', function(req, res, next) {
  if(validateSession(req)){
    res.json({forums: forums});
  }else{
      res.redirect('/login');
  }
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
            usersvoted: []
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
            return b.vote - a.vote;
        });

        console.log(threads);

        //send each thread to the client
        threads.forEach(thread => {
            const data = storageManager.readJSON('storage/forums' + forum + '/' + thread);
                json.push({
                    title: data.title,
                    content: data.content,
                    username: data.username,
                    date: data.date,
                    vote: data.vote,
                    id: data.id
                });
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
        //check user has not alread voted
        const usersvoted = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json').usersvoted;
        //up or down vote and check if user has already voted
            if(vote == 'up' && !usersvoted.includes(req.session.username)){
                const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');
                data.vote++;
                data.usersvoted.push(req.session.username);
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'down' && usersvoted.includes(req.session.username)){
                const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');
                data.vote--;
                const index = data.usersvoted.indexOf(req.session.username);
                data.usersvoted.splice(index, 1);
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'down' && !usersvoted.includes(req.session.username)){
                const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');
                data.vote--;
                data.usersvoted.push(req.session.username);
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }else if(vote == 'up' && usersvoted.includes(req.session.username)){
                const data = storageManager.readJSON('storage/forums' + forum + '/' + id + '.json');
                data.vote++;
                const index = data.usersvoted.indexOf(req.session.username);
                data.usersvoted.splice(index, 1);
                storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', data);
            }
    }
}); 

module.exports = router;

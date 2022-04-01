var express = require('express');
const { rmSync } = require('fs');
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
            res.redirect('/login');
        }
    });
});

//create new thread in forum
router.post('/newThread', function(req, res, next) {
    if(validateSession(req)){
        //get the forum name
        const forum = req.session.forum;
        //get the thread title
        const title = req.body.title;
        //get the thread content
        const content = req.body.content;
        //get the thread author
        const author = req.session.username;
        //get the thread date
        const date = new Date();
        //get the thread id
        const id = date.getTime();

        //create .json file for the thread
        var thread = {
            forum: forum,
            title: title,
            content: content,
            username: author,
            date: date,
            id: id
        };

        //save .json file
        storageManager.writeJSON('storage/forums' + forum + '/' + id + '.json', thread);

        res.redirect('/forums' + forum);

    }else{
        res.redirect('/login');
    }
});

router.get('/getThreads', function(req, res, next) {
    if(validateSession(req)){
        //get the forum name
        const forum = req.session.forum;
        //get all the threads in the forum
        const threads = storageManager.readDir('storage/forums' + forum);
        //remove 'forum-config.json' from the threads array (aka the last element)
        threads.pop();
        return threads;
    }else{
        res.redirect('/login');
    }
});


module.exports = router;

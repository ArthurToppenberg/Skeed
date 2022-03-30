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
  console.log(forum);
  router.get(forum, function(req, res, next) {
      res.render('forum', { 
      title: forum,
      logo: '../images/logo_transparent.png',
      settingsIcon: '../images/settingsIcon.png',
      page: forum,
      username: req.session.username
    });
  });
});

module.exports = router;

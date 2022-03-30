var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');

const forums = ['/main', '/tecnology', '/random', '/anime', '/wierd', '/games', '/sports', '/movies', '/music', '/other'];

router.get('/allForums', function(req, res, next) {
  if(validateSession(req)){
    res.json({forums: forums});
  }else{
      res.redirect('/login');
  }
});

//dynamicaly create rules for each forum
forums.forEach(forum => {
  router.get(forum, function(req, res, next) {
    if(validateSession(req)){
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

module.exports = router;

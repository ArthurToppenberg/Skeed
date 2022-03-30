var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');

router.get('/', function(req, res, next) {
    
    if(validateSession(req)){
        res.render('home', { 
        title: 'Home',
        logo: 'images/logo_transparent.png',
        settingsIcon: 'images/settingsIcon.png',
        page: 'Directory',
        username: req.session.username
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/settings', function(req, res, next) {
    if(validateSession(req)){
        res.send('settings is still under development');
    }else{
        res.redirect('/login');
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const validateSession = require('../src/validateSession');

router.get('/', function(req, res, next) {
    if(validateSession(req)){
        res.render('Home', { 
            title: 'Home',
            logo: '../images/logo_transparent.png',
            settingsIcon: '../images/settingsIcon.png',
            page: 'Home',
            username: req.session.username
        });
    }else{
        res.render('Home', { 
            title: 'Home',
            logo: '../images/logo_transparent.png',
            settingsIcon: '../images/settingsIcon.png',
            page: 'Home',
            username: "Guest"
        });
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

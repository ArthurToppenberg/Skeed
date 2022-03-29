var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    
    if(req.session.username != undefined){
        res.render('home', { 
        title: 'Home',
        logo: 'images/logo_transparent.png',
        page: 'Directory',
        username: req.session.username
        });
    }else{
        res.redirect('/login');
    }
});

module.exports = router;

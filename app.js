var express = require('express');
var path = require('path');

var authenticationRouter = require('./routes/authentication');
var usersRouter = require('./routes/schematic');
var pageNotFoundRouter = require('./routes/pageNotFound');
var homeRouter = require('./routes/home');
var forums = require('./routes/forums');
var social = require('./routes/social');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authenticationRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/forums', forums);
app.use('/social', social);

//if non of the pages responded use pageNotFoundRouter
app.use('*', pageNotFoundRouter);
module.exports = app;

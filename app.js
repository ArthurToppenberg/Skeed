var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var authenticationRouter = require('./routes/authentication');
var usersRouter = require('./routes/schematic');
var pageNotFoundRouter = require('./routes/pageNotFound');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authenticationRouter);
app.use('/users', usersRouter);
app.use('*', pageNotFoundRouter);

module.exports = app;
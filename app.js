var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressJWT = require('express-jwt').expressjwt;
var jsonwebtoken = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth');

var studentsRouter = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressJWT({ secret: "secret", algorithms: ['HS256'] }).unless({ path: ['/login'] }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', authRouter);

app.use('/students', studentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid token');
  } else {
      next(err);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

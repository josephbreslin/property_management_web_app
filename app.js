var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs')
var session = require('express-session')
require('./models/db');
var bodyParser = require('body-parser');

const sessionSecret = "XXXX_YOUR_SESSION_SECRET_XXXX";
var app = express();

app.use(session({
  name: "sessionID",
  secret: sessionSecret,
  saveUninitialized:false,
  resave:false,
  cookie: { 
    sameSite: true,
    maxAge:null
   }
}))

var indexRouter = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//***Generated express error handling*** 
app.use(function(req, res, next) {
  next(createError(404));
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
//****/

module.exports = app;

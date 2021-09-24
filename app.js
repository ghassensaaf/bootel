var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var hotelsRouter = require('./routes/hotel');
var checkoutRouter = require('./routes/checkout');
var hbs = require('hbs');
var ejs = require('ejs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');

hbs.registerHelper("setVar", function(varName, varValue, options) {
  options.data.root[varName] = varValue;
});
hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
      "+": Number((lvalue + rvalue).toFixed(2)),
      "-": Number((lvalue - rvalue).toFixed(2)),
      "*": Number((lvalue * rvalue).toFixed(2)),
      "/": Number((lvalue / rvalue).toFixed(2)),
      "%": Number((lvalue % rvalue).toFixed(2))
  }[operator];
});
hbs.registerHelper('for', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('split', function(string) {
  var t = string.split(",");
  for(let i=0; i<t.length; i++){
    t[i]=Number(t[i]);
  }
  console.log(t);
  return t;
});

hbs.registerPartials(__dirname + '/views/partials');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/hotels', hotelsRouter);
app.use('/checkout',checkoutRouter);

// catch 404 and forward to error handler
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
module.exports = app;

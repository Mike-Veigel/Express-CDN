var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));


//Jade
app.set('view engine', 'jade');
var routes = require('./routes/index');

//Hogan
//app.set("view engine", "html");
//app.engine("html", require("hogan-express"));
//app.locals.delimiters = "[[ ]]";
//app.set("layout", "default");
//app.locals.Test = "Tests Here";
//var routes = require('./routes/index2');

var sslEnabled = false

// Set the CDN options
var options = {
    publicDir  : path.join(__dirname, 'public')
    , viewsDir   : path.join(__dirname, 'views')
    , domain     : 'cdn.steelmma.com'
    , bucket     : 'steelmma'
    , key        : 'AKIAICTM7FP7R45IUONQ'
    , secret     : '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'
    , hostname   : 'localhost'
    , port       : (sslEnabled ? 443 : 3000)
    , ssl        : sslEnabled
    , production : true
};


// Initialize the CDN magic
var CDN = require('express-cdn')(app, options);

app.locals.CDN = CDN();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app
    .set("port", process.env.PORT || 3000)
    .listen(app.get("port"), function () {
    });

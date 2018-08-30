var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var expressHbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var cookieParser = require('cookie-parser');

var app = express();

// app.use(function(req, res, next) {
//   res.locals.session = req.session;
//   next();
// });

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true});


app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 100 } // 180 min (3 hrs)
}));

app.engine('.hbs', expressHbs( {defaultLayout: 'layout', extname: '.hbs'} ));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(cookieParser())


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

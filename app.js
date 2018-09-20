const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const expressHbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const utilsRouter = require('./routes/utils/');
const OptimizelyService = require('./services/optimizely.js');
const optimizely = new OptimizelyService();
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(cookieParser());
// setter
app.set('optimizely', optimizely);

// Optimizely User MiddleWare
app.use((req, res, next) => {
  res.cookie('optimizely_user', req.cookies.optimizely_user || optimizely.generateRandomHash());
  next();
});

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true});

app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 100 } // 180 min (3 hrs)
}));

// Add webpack
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));

app.engine('.hbs', expressHbs( {defaultLayout: 'layout', extname: '.hbs'} ));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/utils', utilsRouter);

app.get('*', (req, res) => {
  const datafile = JSON.stringify(req.app.get('optimizely').datafile);
  res.render('index.hbs', { datafile });
});

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

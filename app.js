const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override');

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const leaderboardRouter = require ('./routes/leaderboard')
const newsRouter = require ('./routes/news')
const articlesRouter = require ('./routes/articles')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

//Session Config
app.use(session({
  secret: "Shh, its a secret",
  resave: false,
  saveUninitialized:false}
  ));

// View Engine Seteup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Global Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userLoggedMiddleware)
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter)
app.use('/leaderboard', leaderboardRouter);
app.use('/news', newsRouter)
app.use('/articles', articlesRouter)

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

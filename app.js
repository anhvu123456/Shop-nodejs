require('dotenv').config;

const CreateError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();
const authRouter = require('./routes/auth');

app.use(compression());

//connect database
mongoose.connect('mongodb://localhost/WebBanHang', { useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) throw err;
  console.log('Connect succesfully');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

app.use(authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  next(CreateError(404));
})

app.listen(8080, function() {
    console.log('Server listening on port ' + 8080);
});

module.exports = app;
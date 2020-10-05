const express = require('express');
const path = require('path');
const app = express();

const authRouter = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRouter);


app.listen(8080, function() {
    console.log('Server listening on port ' + 8080);
  });
  module.exports = app;
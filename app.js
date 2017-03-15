require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Підключення до бази данних
mongoose.connect(`${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`);

//Express
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Роутинг
app.use('/', require('./routes'));

//Опрацювання помилок
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
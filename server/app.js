const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));

app.all('*', (req, res, next) => {
  console.log('an error occurred');
});

module.exports = app;

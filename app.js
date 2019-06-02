const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();
}

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

api(app);

module.exports = app;

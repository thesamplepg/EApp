const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const cookieParser = require("cookie-parser");
const { decodeJWT, logger } = require("./utilits");

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
	require("dotenv").config();
}

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(logger);
app.use(decodeJWT);

api(app);

module.exports = app;

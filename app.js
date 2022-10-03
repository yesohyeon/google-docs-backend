const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authenticateJwt } = require("./middlewares/authenticate");
const connectMongoDB = require("./config/connectMongoDB");

const indexRouter = require("./routes/indexRouter");

const errorHandler = require("./middlewares/errorHandler");
const invalidUrlHandler = require("./middlewares/invalidUrlHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "*",
  credentials: true,
}));

connectMongoDB();

app.use(authenticateJwt);
app.use("/", indexRouter);

app.use(invalidUrlHandler);
app.use(errorHandler);

module.exports = app;

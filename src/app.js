const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authenticate } = require("./middlewares/authenticate");
const connectMongoDB = require("./config/connectMongoDB");

const loginRouter = require("./routes/loginRouter");
const documentRouter = require("./routes/documentRouter");

const errorHandler = require("./middlewares/errorHandler");
const invalidUrlHandler = require("./middlewares/invalidUrlHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

connectMongoDB();

app.use(authenticate);
app.use("/google", loginRouter);
app.use("/documents", documentRouter);

app.use(invalidUrlHandler);
app.use(errorHandler);

module.exports = app;

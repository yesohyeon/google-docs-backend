const express = require("express");
const indexRouter = express.Router();

const { postLogin } = require("./controllers/rootController");

indexRouter.post("/google/login", postLogin);

module.exports = indexRouter;

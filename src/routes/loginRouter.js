const express = require("express");
const loginRouter = express.Router();

const { postLogin } = require("./controllers/loginController");

loginRouter.post("/login", postLogin);

module.exports = loginRouter;

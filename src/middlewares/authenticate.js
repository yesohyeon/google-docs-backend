const createError = require("http-errors");

const admin = require("../config/firebase");
const ERROR = require("../constants/error");

module.exports = {
  authenticate: async function (req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        const user = await admin.auth().verifyIdToken(token);
        req.user = user;

        next();
      } else {
        next(createError(400, ERROR.INVALID_USER));
      }
    } catch (err) {
      next(err);
    }
  },
};

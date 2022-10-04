const createError = require("http-errors");

const User = require("../../models/User");
const ERROR = require("../../constants/error");

module.exports = {
  postLogin: async function (req, res, next) {
    try {
      const { username, googleId } = req.body;

      if (!username || !googleId) {
        return next(createError(400, ERROR.INVALID_USER));
      }

      const user = await User.findOne({ googleId });

      if (!user) {
        await User.create({ username, googleId });
      }

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
};

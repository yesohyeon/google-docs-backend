const User = require("../../models/User");

module.exports = {
  postLogin: async function (req, res, next) {
    try {
      const { username, googleId } = req.body;

      const user = await User.findOne({ googleId });

      if (!user) {
        await User.create({ username, googleId });
      }

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

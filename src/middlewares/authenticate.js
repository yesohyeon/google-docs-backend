const admin = require("../config/firebase");

module.exports = {
  authenticate: async function (req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        const user = await admin.auth().verifyIdToken(token);
        req.user = user;

        next();
      }
    } catch (err) {
      next(err);
    }
  },
};

const ERROR = require("../constants/error");

module.exports = (err, req, res, _) => {
  if (err.status >= 500) {
    return res.status(err.status).json({ error: ERROR.INTERNAL_SERVER_ERROR });
  }

  if (err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: ERROR.CLIENT_ERROR });
  }

  res.status(err.status || 500).json({ error: ERROR.UNACCOUNTABLE_ERROR });
};

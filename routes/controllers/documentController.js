const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../../models/User");
const Document = require("../../models/Document");
const ERROR = require("../../constants/error");

module.exports = {
  getOwnDocuments: async function (req, res, next) {
    try {
      const { googleId } = req.params;

      if (!googleId) {
        return next(createError(400, ERROR.INVALID_USER));
      }

      const user = await User.findOne({ googleId });

      if (!user) {
        return next(createError(400, ERROR.INVALID_USER));
      }

      const documents = await Document.find({ creator: user._id });

      res.status(200).send({ documents });
    } catch (err) {
      next(err);
    }
  },
  postNewDocument: async function(req, res, next) {
    try {
      const { googleId } = req.body;

      if (!googleId) {
        return next(createError(400, ERROR.INVALID_USER));
      }

      const user = await User.findOne({ googleId });

      if (!user) {
        return next(createError(400, ERROR.INVALID_USER));
      }

      const defaultValue = { ops: [{ insert: "" }] };
      const newDocument = await Document.create({
        creator: user._id,
        body: defaultValue,
      });

      res.status(201).send({ documentId: newDocument._id });
    } catch (err) {
      next(err);
    }
  },
  patchDocument: async function(req, res, next) {
    try {
      const { body } = req.body;
      const { documentId } = req.params;

      if (!mongoose.isValidObjectId(documentId)) {
        return next(createError(400, ERROR.INVALID_DOCUMENT));
      }

      const document = await Document.findById(documentId);

      if (!document) {
        return next(createError(400, ERROR.INVALID_DOCUMENT));
      }

      document.body = body;

      await document.save();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
  deleteDocument: async function(req, res, next) {
    try {
      const { documentId } = req.params;

      if (!mongoose.isValidObjectId(documentId)) {
        return next(createError(400, ERROR.INVALID_DOCUMENT));
      }

      await Document.findByIdAndDelete(documentId);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
};

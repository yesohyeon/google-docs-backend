const express = require("express");
const {
  getOwnDocuments,
  postNewDocument,
  patchDocument,
  deleteDocument
} = require("./controllers/documentController");

const documentRouter = express.Router();

documentRouter.get("/:googleId", getOwnDocuments);
documentRouter.post("/", postNewDocument);
documentRouter.patch("/:documentId", patchDocument);
documentRouter.delete("/:documentId", deleteDocument);

module.exports = documentRouter;

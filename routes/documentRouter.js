const express = require("express");
const {
  getOwnDocuments,
  postNewDocument,
  putDocument,
  deleteDocument
} = require("./controllers/documentController");

const documentRouter = express.Router();

documentRouter.get("/:googleId", getOwnDocuments);
documentRouter.post("/", postNewDocument);
documentRouter.put("/:documentId", putDocument);
documentRouter.delete("/:documentId", deleteDocument);


module.exports = documentRouter;

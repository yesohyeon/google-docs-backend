const { Schema, model } = require("mongoose");

const documentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  body: {
    type: Object,
  },
}, { timestamps: true });

const Document = model("Document", documentSchema);

module.exports = Document;

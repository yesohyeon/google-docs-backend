const mongoose = require("mongoose");

const db = mongoose.connection;

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

db.once("open", () => console.log("Connected to database.."));
db.on("error", () => console.log("connection error"));

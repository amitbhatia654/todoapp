const mongoose = require("mongoose");
const URI = process.env.MongoDb_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Failed to Connect Database", error);
  }
};

module.exports = connectDb;

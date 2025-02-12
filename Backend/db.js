const mongoose = require("mongoose");
const URI = process.env.MongoDb_URI;

console.log(URI, "the uri is");

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      //   serverSelectionTimeoutMS: 5000,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Failed to Connect Database", error);
  }
};

module.exports = connectDb;

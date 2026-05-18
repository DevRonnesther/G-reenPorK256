const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
module.exports =  connectDB;

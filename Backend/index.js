require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./dbConfig/dbconfig");
const User = require("./model/User");

const PORT = process.env.PORT || 3001;

// importing connectDB file using dotenv
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.post("/", (req, res) => {});

///Register new user
app.post("/api/signup", async (req, res) => {
  try {
    console.log("Received registration request", req.body);

    const { username, email, password } = req.body;

    //  check if User already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).send("Email already registered");
    }

    // This piece of code jelps create the data to be processed to the db
    const newUser = new User({
      username,
      email,
      password
    });

    // & helps save the data to the db
    await newUser.save();

    // we want to view this in our console before it goes to db
    console.log("User registered successfully:", newUser);

    // Pops a success message in the browser in form of http message inform of alert to a sure the user.
    res.cookie("userId", newUser._id.toString(), { httpOnly: true });
    // Send only specific fields
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error("Database Error:", error);

    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// DB Connection using Mongoose
mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

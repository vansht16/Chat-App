const express = require("express");
const path = require("path");
const formidable = require("formidable");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = express(); // Create an instance of Express
const http = require("http").Server(app); // Create HTTP server
const PORT = 3000;
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./socket.js"); // Import socket logic
const mongoose = require("mongoose");

// MongoDB Connection URL and Database Name
const URL = "mongodb://localhost:27017/chatApp";
let db;

// Mongoose models (if still needed)
const User = require('./models/user.model');  // Your MongoDB User model
const Group = require('./models/group.model'); // Your MongoDB Group model

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (uploaded images)
app.use("/images", express.static(path.join(__dirname, "./userimages")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// This will allow requests only from the frontend of this application
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Login Route using user.json
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Read the user.json file
  fs.readFile(path.join(__dirname, './data/user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading user data" });
    }

    // Parse the JSON data
    const users = JSON.parse(data);

    // Find the user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the plain-text password (this can be changed to hashed password later)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is correct, generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  });
});

// Main function to connect to MongoDB and set up the Express server
async function main() {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    db = mongoose.connection;
    console.log("Connected successfully to MongoDB");

    // Initialize Socket.IO
    const channelsCollection = db.collection("channels");
    const chatHistoryCollection = db.collection("chatHistory");

    sockets.connect(io, chatHistoryCollection);  // Use socket logic for chats

    // Start the server using http
    http.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main(); // Call the main function to connect to MongoDB and start the server

module.exports = app;

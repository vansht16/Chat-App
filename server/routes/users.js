const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');  // For JWT token generation

module.exports = {
  route: (app) => {
    // Login route
    app.post("/api/login", (req, res) => {
      const { username, password } = req.body;

      // Read the user.json file
      fs.readFile(path.join(__dirname, '../data/user.json'), 'utf8', (err, data) => {
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
  }
};

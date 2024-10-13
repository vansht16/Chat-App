const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },  // Optional field for storing the avatar image path
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]  // References to Group model
});

// Export the User model to be used in other parts of the backend
module.exports = mongoose.model('User', userSchema);

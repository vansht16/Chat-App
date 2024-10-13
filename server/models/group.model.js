const mongoose = require('mongoose');

// Define the schema for the Group model
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Group name
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Reference to User model
  messages: [{ type: String }]  // Array of chat messages
});

// Export the Group model to be used in other parts of the backend
module.exports = mongoose.model('Group', groupSchema);

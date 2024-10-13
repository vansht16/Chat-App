module.exports.connect = function(io, chatHistoryCollection) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a group room
    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
      console.log(`User joined group: ${groupId}`);

      // Send chat history to the user joining
      chatHistoryCollection.find({ groupId }).toArray((err, chats) => {
        if (err) throw err;
        socket.emit('chatHistory', chats);  // Emit chat history to the user
      });
    });

    // Listen for new messages
    socket.on('newMessage', (data) => {
      const { groupId, message, sender } = data;

      // Save the message to MongoDB
      chatHistoryCollection.insertOne({ groupId, message, sender, timestamp: new Date() });

      // Broadcast message to everyone in the group, including sender
      io.to(groupId).emit('messageReceived', { message, sender });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

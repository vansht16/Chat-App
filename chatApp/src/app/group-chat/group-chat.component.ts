import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  groupId: string;
  currGroup: any = { name: 'Default Group Name' };  // Placeholder for the current group

  constructor(private socket: Socket, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the groupId from the route
    this.groupId = this.route.snapshot.paramMap.get('groupId');

    // Join the group room
    this.socket.emit('joinGroup', this.groupId);

    // Listen for chat history when joining
    this.socket.on('chatHistory', (chats) => {
      this.messages = chats;
    });

    // Listen for new messages
    this.socket.on('messageReceived', (data) => {
      this.messages.push(data);
    });
  }

  // Method to send a message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Send the message to the server
      this.socket.emit('newMessage', {
        groupId: this.groupId,
        message: this.newMessage,
        sender: 'YourUsername'  // Replace this with actual sender username
      });
      this.newMessage = '';  // Clear the input field
    }
  }

  // Method to leave the group
  leaveGroup(): void {
    console.log('Leaving group...');
    this.socket.emit('leaveGroup', this.groupId);  // Emit leave group event to the server
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css'],
})
export class AdminTabComponent implements OnInit {
  // Properties to control visibility of sections
  showUserRequests: boolean = true;
  showGroupRequests: boolean = false;

  // Sample data for user and group requests
  userRequests = [
    { username: 'JohnDoe', email: 'johndoe@example.com' },
    { username: 'JaneDoe', email: 'janedoe@example.com' },
  ];

  groupRequests = [
    { name: 'Study Group', creator: 'Alice' },
    { name: 'Music Group', creator: 'Bob' },
  ];

  constructor() {}

  ngOnInit(): void {}

  // Method to toggle to user requests
  viewUserRequests() {
    this.showUserRequests = true;
    this.showGroupRequests = false;
  }

  // Method to toggle to group requests
  viewGroupRequests() {
    this.showUserRequests = false;
    this.showGroupRequests = true;
  }

  // Method to approve user request
  approveUser(request: any) {
    console.log('User approved:', request);
    // Add logic to handle user approval
  }

  // Method to reject user request
  rejectUser(request: any) {
    console.log('User rejected:', request);
    // Add logic to handle user rejection
  }

  // Method to approve group request
  approveGroup(group: any) {
    console.log('Group approved:', group);
    // Add logic to handle group approval
  }

  // Method to reject group request
  rejectGroup(group: any) {
    console.log('Group rejected:', group);
    // Add logic to handle group rejection
  }
}

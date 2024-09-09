import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    username: '',
    birthdate: '',
    age: ''
  };

  constructor() {}

  ngOnInit(): void {
    // Example of loading user data (this could be fetched from a service or API)
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  // Method to save profile information
  saveProfile(): void {
    // Save the updated profile to sessionStorage (or send it to the server)
    sessionStorage.setItem('user', JSON.stringify(this.user));
    console.log('Profile saved:', this.user);
    alert('Profile updated successfully!');
  }
}

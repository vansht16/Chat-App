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
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  saveProfile(): void {
  
    sessionStorage.setItem('user', JSON.stringify(this.user));
    console.log('Profile saved:', this.user);
    alert('Profile updated successfully!');
  }
}

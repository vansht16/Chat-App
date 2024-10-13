import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the login state from the user service
    this.userService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Check if running in the browser and if a token exists
    if (this.isBrowser() && !localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  // Helper function to check if we are in the browser environment
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Method to log out and clear the token
  logout() {
    if (this.isBrowser()) {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }
}

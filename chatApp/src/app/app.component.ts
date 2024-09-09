import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatApp';
  loggedInUser: any;

  constructor(
    public router: Router,
    public userService: UserService,
    public group: GroupService
  ) {
    console.log('app component');
  }

  ngOnInit(): void {
    // Navigate according to login status
    this.userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }
    });

    // Track logged-in user data
    this.userService.user$.subscribe((user) => {
      this.loggedInUser = user ? user.username : null;
    });
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn(); // Check if user is logged in
  }

  logout() {
    this.userService.logout(); // Perform logout
    this.router.navigateByUrl('/login');
  }
}

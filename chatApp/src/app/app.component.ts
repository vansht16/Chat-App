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
    
    this.userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }
    });

   
    this.userService.user$.subscribe((user) => {
      this.loggedInUser = user ? user.username : null;
    });
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn(); 
  }

  logout() {
    this.userService.logout(); 
    this.router.navigateByUrl('/login');
  }
}

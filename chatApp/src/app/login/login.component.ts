import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Assuming you have UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login(): void {
    const user = this.userService.validateLogin(this.username, this.password);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user)); // Store the logged-in user
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    } else {
      alert('Invalid username or password');
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }
}

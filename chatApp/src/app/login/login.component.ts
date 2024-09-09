import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  signupUsername: string = '';
  signupEmail: string = '';
  signupPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login({
      username: this.loginUsername,
      password: this.loginPassword,
    }).subscribe((response: any) => {
      if (response) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    }, error => {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    });
  }

  signUp() {
    this.userService.signUp({
      username: this.signupUsername,
      email: this.signupEmail,
      password: this.signupPassword,
    }).subscribe((response: any) => {
      if (response) {
        alert('Sign-up successful! You can now log in.');
        this.router.navigate(['/login']);
      } else {
        alert('Error signing up');
      }
    }, error => {
      console.error('Sign-up failed', error);
      alert('Error signing up. Please try again.');
    });
  }
}

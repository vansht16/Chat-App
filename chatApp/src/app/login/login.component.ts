import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  signupUsername: string = '';
  signupPassword: string = '';
  signupEmail: string = '';

  constructor(public router: Router, private userService: UserService) {}

  // Function to handle user login
  onLogin() {
    if (this.loginUsername && this.loginPassword) {
      // The login method should return an observable that we can subscribe to
      this.userService
        .login({
          username: this.loginUsername,
          password: this.loginPassword, // Make sure to pass the password
        })
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.router.navigate(['/dashboard']);
            } else {
              alert('Invalid credentials. Please try again.');
            }
          },
          (error) => {
            console.error('Error during login:', error);
            alert('Error during login. Please try again later.');
          }
        );
    }
  }

  // Function to handle user sign-up
  onSignUp() {
    if (this.signupUsername && this.signupPassword && this.signupEmail) {
      // The signUp method should be defined in the UserService
      this.userService
        .signUp({
          username: this.signupUsername,
          password: this.signupPassword,
          email: this.signupEmail,
        })
        .subscribe(
          (response: any) => {
            if (response.success) {
              alert('Sign-up successful! Please log in.');
              this.clearSignupFields();
            } else {
              alert('Error during sign-up. Try again.');
            }
          },
          (error) => {
            console.error('Error during sign-up:', error);
            alert('Error during sign-up. Please try again later.');
          }
        );
    }
  }

  // Helper function to clear sign-up fields after registration
  clearSignupFields() {
    this.signupUsername = '';
    this.signupPassword = '';
    this.signupEmail = '';
  }
}

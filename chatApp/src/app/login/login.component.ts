import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  login() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:3000/api/login', loginData).subscribe(
      (response: any) => {
        if (response.token) {
          // Store the token in localStorage and set login state
          localStorage.setItem('token', response.token);
          this.userService.setUser(response.user);  // Assuming response contains user data
          this.router.navigate(['/dashboard']);  // Navigate to dashboard after login
        }
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}

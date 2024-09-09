import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  // Login method with username and password
  validateLogin(username: string, password: string) {
    return this.http.post<{ valid: boolean; user: any }>('/api/auth', {
      username,
      password,
    });
  }

  // Logout method
  logout() {
    this.user.next(null);
    this.loggedIn.next(false);
  }

  signUp(data: { username: string; email: string; password: string }) {
    return this.http.post('/api/signup', data);
  }

  // Public method to set user
  setUser(user: any) {
    this.user.next(user); // Store user details
    this.loggedIn.next(true); // Set logged-in status to true
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.loggedIn.getValue();
  }
}

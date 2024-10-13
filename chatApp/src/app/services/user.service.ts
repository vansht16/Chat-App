import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn$ = new BehaviorSubject<boolean>(false);  // Observable for login status
  user$ = new BehaviorSubject<any>(null);  // Observable for current user

  constructor() {
    // Check if the environment is browser before accessing localStorage
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      this.loggedIn$.next(!!token);
    }
  }

  // Helper function to check if we're in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Logout function to reset login state
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');  // Only remove token if in the browser
    }
    this.loggedIn$.next(false);
    this.user$.next(null);
  }

  // Set user info after login
  setUser(user: any) {
    this.user$.next(user);
    this.loggedIn$.next(true);
  }
}

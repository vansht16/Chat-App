import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Observable for loggedIn status
  get loggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Observable for the current user
  get user$(): Observable<any> {
    return this.user.asObservable();
  }

  // Login method that sends the username and password to the server
  login(userDetails: { username: string; password: string }): Observable<any> {
    return this.http.post('/api/login', userDetails);
  }

  // Set login state and user data after successful login
  setLoginState(user: any): void {
    this.user.next(user);
    this.loggedIn.next(true);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Perform logout by resetting the state
  logout(): void {
    this.user.next(null);
    this.loggedIn.next(false);
  }

  // Sign-up method that sends username, password, and email to the server
  signUp(userDetails: {
    username: string;
    password: string;
    email: string;
  }): Observable<any> {
    return this.http.post('/api/signup', userDetails);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();


  private userGroups = {
    vansh: ['Group A', 'Group B'],
    john: ['Group C', 'Group D'],
    admin: ['Group E'],
  };

  constructor(private http: HttpClient) {}

  
  login(credentials: { username: string; password: string }) {
    return this.http.post('/api/auth', credentials);
  }

  
  logout() {
    this.user.next(null);
    this.loggedIn.next(false);
  }

 
  signUp(data: { username: string; email: string; password: string }) {
    return this.http.post('/api/signup', data);
  }


  setUser(user: any) {
    this.user.next(user);
    this.loggedIn.next(true); 
  }

 
  isLoggedIn() {
    return this.loggedIn.getValue();
  }

 
  getUserGroups(username: string): string[] {
    return this.userGroups[username] || []; 
  }
}

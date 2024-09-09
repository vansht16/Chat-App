import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.userService.isLoggedIn(); // Use isLoggedIn method
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

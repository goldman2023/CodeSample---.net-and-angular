import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public router: Router) { }
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

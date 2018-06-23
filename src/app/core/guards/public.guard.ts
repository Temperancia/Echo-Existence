import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class PublicGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (JSON.parse(localStorage.getItem('currentUser'))['id'] !== undefined) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/flux']);
    return false;
  }
}

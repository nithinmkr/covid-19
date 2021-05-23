import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {
  }

  canActivate() {

    let currentUser = this.authservice.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

}

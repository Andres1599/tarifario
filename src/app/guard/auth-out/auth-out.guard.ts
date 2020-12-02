import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOutGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    try {
      if (this.authService.geToken()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      return false;
    }
  }

}

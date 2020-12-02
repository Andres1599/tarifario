import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOnGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    try {
      if (this.authService.geToken()) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

}

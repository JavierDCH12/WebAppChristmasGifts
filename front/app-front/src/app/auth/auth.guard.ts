import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NAVIGATION_ROUTES } from '../utils/constants';
import { AccessAuthService } from '../services/AccessAuth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accessAuthService: AccessAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accessAuthService.isAuthenticated()) {
      return true; 
    } else {
      this.router.navigate([NAVIGATION_ROUTES.LOGIN], { queryParams: { returnUrl: state.url } });
      return false; 
    }
  }
}

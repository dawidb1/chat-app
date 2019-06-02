import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from './authorization/services/login.service';
import { Routing } from './model/routing.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.authUser()) {
      return true;
    } else {
      console.log('navigating login');

      this.router.navigate([Routing.LOGIN]);
      return false;
    }
  }
}

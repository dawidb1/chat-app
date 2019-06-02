import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from './authorization/services/login.service';
import { map, catchError } from 'rxjs/operators';
import { Routing } from './model/routing.enum';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.authUser()) {
      this.router.navigate([Routing.CHAT]);
      return false;
    } else {
      return true;
    }
  }
}

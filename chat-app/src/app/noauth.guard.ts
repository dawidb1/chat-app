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
    return this.loginService
      .authUser$()
      .pipe(
        map(e => {
          if (!e) {
            return true;
          } else {
            this.router.navigate([Routing.CHAT]);
            return false;
          }
        })
      )
      .pipe(
        catchError(() => {
          this.router.navigate([Routing.CHAT]);
          return of(false);
        })
      );
  }
}

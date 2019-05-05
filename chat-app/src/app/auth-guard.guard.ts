import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from './authorization/services/login.service';
import { map, catchError } from 'rxjs/operators';
import { Routing } from './model/routing.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService
      .authUser()
      .pipe(
        map(e => {
          console.log(e);

          if (e.uid) {
            console.log('returning true auth');
            return true;
          }
        })
      )
      .pipe(
        catchError(() => {
          console.log('navigating login');

          this.router.navigate([Routing.LOGIN]);
          return of(false);
        })
      );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/authorization/services/login.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string;
  isLoggedIn: boolean;
  user: Observable<firebase.User>;

  logoutSubscription: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.logoutSubscription = new Subscription();
    this.user = this.loginService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.username = user.email;
      }
    });
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe(() => this.logoutSubscription.unsubscribe());
  }
}

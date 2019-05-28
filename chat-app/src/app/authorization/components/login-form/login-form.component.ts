import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Routing } from 'src/app/model/routing.enum';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  email: string; // = 'email4@email.com';
  password: string; // = 'token4user';
  errorMsg: string;

  loginSubscription: Subscription;

  constructor(private authService: LoginService, private router: Router) {}

  login() {
    this.authService
      .authorize(this.email, this.password)
      .catch(error => (this.errorMsg = error.message))
      .then(() => {
        this.loginSubscription = this.authService.setLoginUser().subscribe(() => {
          this.router.navigate([Routing.CHAT]);
        });
      });
  }

  ngOnInit() {
    this.loginSubscription = new Subscription();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}

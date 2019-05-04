import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  email = 'email4@email.com';
  password = 'token4user';
  errorMsg: string;

  loginSubscription: Subscription;

  constructor(private authService: LoginService, private router: Router) {}

  login() {
    console.log('login() called from login-form component');
    this.authService
      .authorize(this.email, this.password)
      .catch(error => (this.errorMsg = error.message))
      .then(() => {
        this.loginSubscription = this.authService.setLoginUser().subscribe();
      });
  }

  ngOnInit() {
    this.loginSubscription = new Subscription();
  }

  ngOnDestroy() {
    console.log(this.loginSubscription);

    this.loginSubscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MatDialog } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  errorMsg: string;

  loginSubscription: Subscription;

  constructor(private ngxLoader: NgxUiLoaderService, private authService: LoginService, public dialog: MatDialog) {}

  login() {
    this.ngxLoader.start();
    this.authService
      .authorize(this.email, this.password)
      .catch(error => {
        this.ngxLoader.stop();
        const dialogRef = this.dialog.open(LoginModalComponent, {
          height: '170px',
          width: '300px'
        });
      })
      .then(() => {
        this.loginSubscription = this.authService.setLoginUser().subscribe();
      });
  }

  ngOnInit() {
    this.loginSubscription = new Subscription();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}

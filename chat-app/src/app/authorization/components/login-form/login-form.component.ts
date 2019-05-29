import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


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

  constructor(private authService: LoginService, private router: Router, public dialog: MatDialog) {}

  login() {
    this.authService
      .authorize(this.email, this.password)
      .catch(error => {
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

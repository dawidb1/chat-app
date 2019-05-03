import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  email = 'email2@email.com';
  password = 'token1user';
  errorMsg: string;

  constructor(private authService: LoginService, private router: Router) {}

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password).catch(error => (this.errorMsg = error.message));
  }

  ngOnInit() {}
}

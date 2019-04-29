import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  email = 'test@test.pl';
  password = 'test1234';
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password).catch(error => (this.errorMsg = error.message));
  }

  ngOnInit() {}
}

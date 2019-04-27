import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  registerForm: FormGroup;
  email: string;
  password: string;
  displayName: string;
  errorMessage: string;
  successMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      token: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeat_password: new FormControl()
    });
  }

  signUp() {
    const creds = this.getPatientInfo(this.registerForm.value.token);
    const userData: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    // todo validate password

    this.authService.signUp(creds, userData).then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this.router.navigate(['chat']);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  private getPatientInfo(token: string) {
    // todo get patients info by token
    const credentials = {
      email: token,
      password: 'test1234'
    };
    return credentials;
  }
}

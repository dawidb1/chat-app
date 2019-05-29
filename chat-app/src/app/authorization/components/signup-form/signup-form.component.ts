import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { ClinicUser } from '../../model/clinic-user.model';
import { ClinicUserService } from '../../services/clinic-user.service';
import { RegisterFormUser } from '../../model/register-form-user.model';
import { UserStatus } from '../../model/user-status.enum';
import { SignUpService } from '../../services/sign-up.service';
import { Routing } from 'src/app/model/routing.enum';
import { MatDialog } from '@angular/material';
import { SignupModalComponent } from './signup-modal/signup-modal.component';

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

  constructor(
    private signUpService: SignUpService,
    private clinicUserService: ClinicUserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }

  signUp() {
    this.clinicUserService.getUserByToken(this.registerForm.value.token).subscribe((res: ClinicUser) => {
      const clinicUser: ClinicUser = res;
      const registerFormUser = this.getRegisterFormUser();

      const user = this.createAppUser(registerFormUser, clinicUser);
      // todo validate password

      this.resolveSignUp(user);
    });
  }

  resolveSignUp(user: User) {
    this.signUpService.signUp(user).then(
      res => {
        this.setSuccesMessage();
        this.router.navigate([Routing.LOGIN]);
      },
      err => {
        this.setErrorMessage(err);
        /*
        this.setErrorMessage(err=> {
          const dialogRef = this.dialog.open(SignupModalComponent, {
          height: '170px',
          width: '300px'
         });
         })*/
      }
    );
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      token: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeat_password: new FormControl()
    });
  }

  getRegisterFormUser(): RegisterFormUser {
    const registerFormUser: RegisterFormUser = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    return registerFormUser;
  }

  createAppUser(formUser: RegisterFormUser, clinicUser: ClinicUser) {
    const user: User = {
      email: clinicUser.email,
      username: formUser.username,
      password: formUser.password,
      status: UserStatus.OFFLINE,
      userType: clinicUser.userType,
      firstName: clinicUser.firstName,
      lastName: clinicUser.lastName,
      uid: null
    };
    return user;
  }

  setSuccesMessage() {
    this.errorMessage = '';
    this.successMessage = 'Your account has been created';
  }

  setErrorMessage(err) {

    console.log(err);
    this.errorMessage = err.message;
    this.successMessage = ''; 

    /*console.log(err=> {
        const dialogRef = this.dialog.open(SignupModalComponent, {
   height: '170px',
   width: '300px'
  });
  })*/

   /* this.errorMessage  
      const dialogRef = this.dialog.open(SignupModalComponent, {
      height: '170px',
      width: '300px'
     });*/
    
  }
}

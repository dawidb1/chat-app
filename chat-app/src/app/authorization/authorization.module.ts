import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ImportModule } from '../shared/import/import.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, ImportModule, SharedModule]
})
export class AuthorizationModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ImportModule } from '../shared/modules/import.module';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, ImportModule, SharedModule]
})
export class AuthorizationModule {}

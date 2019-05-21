import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ImportModule } from '../shared/modules/import.module';
import { LoginModuleComponent } from './components/login-module/login-module.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-form/signup-modal/signup-modal.component';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent, LoginModuleComponent, LoginModalComponent, SignupModalComponent],
  imports: [CommonModule, ImportModule, SharedModule]
})
export class AuthorizationModule {}

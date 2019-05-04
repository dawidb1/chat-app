import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from '../../patient-history/components/history/history.component';
import { SignupFormComponent } from '../../authorization/components/signup-form/signup-form.component';
import { LoginFormComponent } from '../../authorization/components/login-form/login-form.component';
import { ChatroomComponent } from '../../chat/components/chatroom/chatroom.component';
import { Routing } from 'src/app/model/routing.enum';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';
import { NoauthGuard } from 'src/app/noauth.guard';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent
  },
  { path: Routing.SIGNUP, canActivate: [NoauthGuard], component: SignupFormComponent },
  { path: Routing.LOGIN, canActivate: [NoauthGuard], component: LoginFormComponent },
  { path: Routing.CHAT, canActivate: [AuthGuardGuard], component: ChatroomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

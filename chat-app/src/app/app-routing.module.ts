import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './patient-history/history/history.component';
import { SignupFormComponent } from './authorization/signup-form/signup-form.component';
import { LoginFormComponent } from './authorization/login-form/login-form.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent
  },
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

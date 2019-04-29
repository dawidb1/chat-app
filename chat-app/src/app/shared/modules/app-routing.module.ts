import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from '../../patient-history/components/history/history.component';
import { SignupFormComponent } from '../../authorization/components/signup-form/signup-form.component';
import { LoginFormComponent } from '../../authorization/components/login-form/login-form.component';
import { ChatroomComponent } from '../../chat/components/chatroom/chatroom.component';

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

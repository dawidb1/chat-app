import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { HistoryComponent } from './patient-history/history/history.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatListComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

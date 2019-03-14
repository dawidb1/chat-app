import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { HistoryComponent } from './patient-history/history/history.component';
import { Zadanie1Component } from './zadania/zadanie1/zadanie1.component';
import { Zadanie2Component } from './zadania/zadanie2/zadanie2.component';
import { Zadanie3Component } from './zadania/zadanie3/zadanie3.component';
import { Zadanie4Component } from './zadania/zadanie4/zadanie4.component';
import { Zadanie5Component } from './zadania/zadanie5/zadanie5.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatListComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'zad1',
    component: Zadanie1Component
  },
  {
    path: 'zad2',
    component: Zadanie2Component
  },
  {
    path: 'zad3',
    component: Zadanie3Component
  },
  {
    path: 'zad4',
    component: Zadanie4Component
  },
  {
    path: 'zad5',
    component: Zadanie5Component
  },
  {
    path: '',
    component: Zadanie1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

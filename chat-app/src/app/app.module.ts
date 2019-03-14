import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { PatientHistoryModule } from './patient-history/patient-history.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ZadaniaModule } from './zadania/zadania.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    ChatModule,
    PatientHistoryModule,
    ZadaniaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

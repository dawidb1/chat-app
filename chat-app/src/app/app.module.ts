import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { PatientHistoryModule } from './patient-history/patient-history.module';
import { SharedModule } from './shared/shared.module';
import { ImportModule } from './shared/import/import.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ImportModule,
    AuthorizationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    ChatModule,
    PatientHistoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

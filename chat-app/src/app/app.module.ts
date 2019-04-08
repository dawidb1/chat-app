import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { PatientHistoryModule } from './patient-history/patient-history.module';
import { SharedModule } from './shared/shared.module';

import { ImportModule } from './shared/import/import.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationModule } from './authorization/authorization.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ImportModule, SharedModule, AppRoutingModule, ChatModule, PatientHistoryModule, AuthorizationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatListModule } from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule
  ],
  entryComponents: [SidenavComponent],
  exports: [SidenavComponent, MatSidenavModule,
    MatCheckboxModule, MatIconModule, MatToolbarModule, RouterModule]
})
export class SharedModule { }

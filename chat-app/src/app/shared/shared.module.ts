import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatListModule } from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule
  ],
  entryComponents: [SidenavComponent],
  exports: [SidenavComponent, MatSidenavModule,
    MatCheckboxModule, MatIconModule, MatToolbarModule, RouterModule]
})
export class SharedModule { }

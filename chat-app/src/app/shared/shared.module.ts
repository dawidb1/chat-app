import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule],
  entryComponents: [],
  exports: [RouterModule, NavbarComponent]
})
export class SharedModule {}

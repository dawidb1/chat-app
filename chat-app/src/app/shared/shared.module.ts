import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MyMaterialModule } from './material.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, MyMaterialModule],
  entryComponents: [],
  exports: [RouterModule, NavbarComponent, MyMaterialModule]
})
export class SharedModule {}

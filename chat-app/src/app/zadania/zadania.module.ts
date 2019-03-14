import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Zadanie1Component } from './zadanie1/zadanie1.component';
import { Zadanie2Component } from './zadanie2/zadanie2.component';
import { Zadanie3Component } from './zadanie3/zadanie3.component';
import { Zadanie4Component } from './zadanie4/zadanie4.component';
import { Zadanie5Component } from './zadanie5/zadanie5.component';

@NgModule({
  declarations: [
    Zadanie1Component,
    Zadanie2Component,
    Zadanie3Component,
    Zadanie4Component,
    Zadanie5Component
  ],
  imports: [CommonModule]
})
export class ZadaniaModule {}

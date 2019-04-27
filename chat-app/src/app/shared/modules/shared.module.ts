import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MyMaterialModule } from './material.module';
import { ReversePipe } from '../pipes/reverse.pipe';

@NgModule({
  declarations: [NavbarComponent, ReversePipe],
  imports: [BrowserModule, CommonModule, RouterModule, HttpClientModule, MyMaterialModule],
  entryComponents: [NavbarComponent],
  exports: [NavbarComponent, RouterModule, NavbarComponent, MyMaterialModule, ReversePipe]
})
export class SharedModule {}

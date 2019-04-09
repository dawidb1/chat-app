import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MyMaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NavbarComponent],
  imports: [BrowserModule, CommonModule, RouterModule, HttpClientModule, MyMaterialModule],
  entryComponents: [NavbarComponent],
  exports: [NavbarComponent, RouterModule, NavbarComponent, MyMaterialModule]
})
export class SharedModule {}

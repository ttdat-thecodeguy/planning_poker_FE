import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { DashboardComponent } from './components/templates/dashboard/dashboard.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MaterialCustomModule } from "./material.module"
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NewGameComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    /* Material Module */
    MaterialCustomModule,
    RouterModule
  ],
  providers: [],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],

})
export class AppModule { }

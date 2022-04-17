import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent, LoginDialog, SignUpDialog } from './components/templates/header/header.component';
import { DashboardComponent } from './components/templates/dashboard/dashboard.component';
import { CustomDeckDialog, NewGameComponent } from './components/new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MaterialCustomModule } from "./material.module"
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { GameTableComponent, InviteFriend } from './components/game-table/game-table.component';
import { DeckComponent } from './components/deck/deck.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NewGameComponent,
    LoginDialog,
    SignUpDialog,
    CustomDeckDialog,
    GameTableComponent,
    DeckComponent,
    InviteFriend
  ],
  imports: [
    CommonModule,
    FormsModule, 
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

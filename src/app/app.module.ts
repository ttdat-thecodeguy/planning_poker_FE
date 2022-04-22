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
import { GameTableComponent, InviteFriend, SigninAsGuestDialog } from './components/game-table/game-table.component';
import { DeckComponent } from './components/deck/deck.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreModule } from '@ngrx/store';

import { authReducer } from "./store/reducers/users.reducers"
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotiComponent } from './components/noti/noti.component';



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
    InviteFriend,
    SigninAsGuestDialog,
    NotFoundComponent,
    NotiComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    /* Material Module */
    MaterialCustomModule,
    RouterModule,
    
    ImageCropperModule,
    HttpClientModule,
    StoreModule.forRoot({ auth : authReducer })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],

})
export class AppModule { }

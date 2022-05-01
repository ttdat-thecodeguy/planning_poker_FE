import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MaterialCustomModule } from "./material.module"
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreModule } from '@ngrx/store';

import { authReducer } from "./store/reducers/users.reducers"
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { CustomDeckDialog } from './shards/dialog/custom-deck/custom-deck.dialog';
import { ImportIssueAsCSVDialog } from './shards/dialog/import-issue-as-csv/import-issue-as-csv.dialog';
import { InviteFriend } from './shards/dialog/invite-friend/invite-friend.dialog';
import { IssueDetailsDialog } from './shards/dialog/issue-details/issue-details.dialog';
import { LoginDialog } from './shards/dialog/login/login.dialog';
import { SigninAsGuestDialog } from './shards/dialog/signin-as-guest/signin-as-guest.dialog';
import { SignUpDialog } from './shards/dialog/signup/signup.dialog';
import { DeckComponent } from './components/deck/deck.component';
import { IssueComponent } from './components/issue/issue.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GameTableComponent } from './pages/game-table/game-table.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResultsComponent } from './components/results/results.component';




@NgModule({
  declarations: [
    AppComponent,
    /* Dialog */
    CustomDeckDialog,
    ImportIssueAsCSVDialog,
    InviteFriend,
    IssueDetailsDialog,
    SigninAsGuestDialog,
    SignUpDialog,
    LoginDialog,

    
    /* Component */
    NewGameComponent,
    DeckComponent,
    IssueComponent,
    ResultsComponent,


    /* Pages */
    DashboardComponent,
    GameTableComponent,
    NewGameComponent,
    NotFoundComponent,
    
    /* Templates */
    HeaderComponent
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

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserResponse } from 'src/app/model/user-response.model';
import { isEmpty } from "lodash"
import { UserService } from 'src/app/service/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotiComponent } from '../../../shards/noti/noti.component';
import { LoginDialog } from 'src/app/shards/dialog/login/login.dialog';
import { SignUpDialog } from 'src/app/shards/dialog/signup/signup.dialog';
import { select, Store } from '@ngrx/store';
import { getAuthSpectorMode } from 'src/app/store/selectors/users.selectors';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  route: string = "";
  tableName: string = 'Creating Planning Poker';
  @Input() user? : UserResponse
  toggleSpectatorMode? : boolean = this.user?.spectorMode || false;

  constructor(private dialog : MatDialog,
              private loc : Location,
              private router: Router,
              private userService : UserService, 
              private _snackBar : MatSnackBar,
              private store: Store<{ auth: any }>) { 

    
  }


  ngOnInit(): void {
    // get data when router change
    this.router.events.subscribe(( _ ) => {
      if(this.router.getCurrentNavigation()?.extras.state !== undefined){       
        this.tableName = this.router.getCurrentNavigation()?.extras.state!['tableName'] 
      } if(this.loc.path() != ''){
        this.route = this.loc.path();
      } else {
        this.route = 'dashboard'
      }
    });


    /// get data when spectator change
    this.store.pipe(select(getAuthSpectorMode)).subscribe(item => {
      this.toggleSpectatorMode = item
    })
  }


  openLoginDialog(){
    this.dialog.open(LoginDialog)
  }
  openSignupDialog(){
    this.dialog.open(SignUpDialog)
  }
  onSignOut(){
    this.userService.logOut()
    this._snackBar.openFromComponent(NotiComponent, {
      duration: 500, data: "You have successfuly signed out", verticalPosition: 'top' 
    })
  }
  checkEmpty(){
    return isEmpty(this.user)
  }
  onToggleSpectatorMode(event : any){
    this.userService.activeSpectatorMode(this.toggleSpectatorMode!);
  }
}






import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserResponse } from 'src/app/model/user-response.model';
import { isEmpty } from "lodash"
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userSignAction } from 'src/app/store/actions/users.action';
import { UserService } from 'src/app/service/users.service';
import { UserSignError } from "../../../model/user-error.model"
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotiComponent } from '../../noti/noti.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  route: string = "";
  tableName: string = 'Creating Planning Poker';
  @Input() user? : UserResponse
  constructor(private dialog : MatDialog,
              private loc : Location,
              router: Router,
              private userService : UserService, 
              private _snackBar : MatSnackBar) { 

    router.events.subscribe(( _ ) => {
      if(router.getCurrentNavigation()?.extras.state !== undefined){       
        this.tableName = router.getCurrentNavigation()?.extras.state!['tableName'] 
      } if(this.loc.path() != ''){
        this.route = loc.path();
      } else {
        this.route = 'dashboard'
      }
    });
  }


  ngOnInit(): void {
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
}


@Component({
  selector: "login-dialog",
  templateUrl: './login-dialog.dialog.html'
})
export class LoginDialog {
  //// Init Variable
  err : UserSignError = {
    error: ''
  };
  loginForm = new FormGroup({
    email: new FormControl(''),
    password : new FormControl('')
  })
  constructor(private userService : UserService, private dRef : MatDialogRef<LoginDialog>, private store: Store<{ auth: any }>) {}
  //// function
  onLoginSubmit(){
    let data = this.loginForm.value;
    if(data.email !== '' && data.password !== '') {
        this.userService.login(data.email, data.password).subscribe( 
          item => {
            let data = (item as UserSignError).error
            if(data !== undefined){
              this.err.error = data
            }
            else{
              this.store.dispatch(userSignAction({ payload: item }))
              localStorage.setItem('userLogin', JSON.stringify(item));
              this.dRef.close()
            }
          },
          err => {          
              this.err = err.error;
          });
        
    } else{
        this.err = {error : "Database : (Error) Your email or your password must not empty"}
    }
  }

  onOpenSignUpDialog(){

  }

  isEmptyItem(item : any){
    return isEmpty(item)
  }
}


@Component({
  selector: "signup-dialog",
  templateUrl: './signup-dialog.dialog.html'
})
export class SignUpDialog {
  
  isEmptyItem(item : any){
    return isEmpty(item)
  }

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    displayName: new FormControl(''),
    terms : new FormControl(false)
  })

  constructor(private userService : UserService, private store: Store<{ auth: any }>,  private dRef : MatDialogRef<SignUpDialog>, private dialog : MatDialog){}

  err : UserSignError = {
    error: ''
  }
  onOpenLoginDialog(){
    this.dRef.close()
    this.dialog.open(LoginDialog)
  }
  onSignUpSubmit(){
    let data = this.signUpForm.value;
    if(data.password.length < 6 || data.password.length > 32) this.err = { error : "Password must be between 6 and 32 characters" }
    else if(data.password !== data.repeatPassword) this.err = { error: "Passwords are not the same" }
    else if(data.terms === false)  this.err = { error: "Please accept our terms and conditions" }
    else{
      this.userService.signup(data.email, data.password, data.displayName).subscribe(
        item => {
            let data = (item as UserSignError).error
            if(data !== undefined){
              this.err.error = data
            }
            else{
              this.store.dispatch(userSignAction({ payload: item }))
              localStorage.setItem('userLogin', JSON.stringify(item));
              this.dRef.close()
            }     
        },
        err => {       
          this.err = err.error;
        }
      )
    }
  }
}
import { Component } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { Store } from "@ngrx/store"
import { isEmpty } from "lodash"
import { UserSignError } from "src/app/model/user-error.model"
import { UserService } from "src/app/service/users.service"
import { userSignAction } from "src/app/store/actions/users.action"
import { LoginDialog } from "../login/login.dialog"

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
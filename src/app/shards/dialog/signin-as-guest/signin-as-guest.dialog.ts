import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { Store } from "@ngrx/store"
import { UserService } from "src/app/service/users.service"
import { userSignAction } from "src/app/store/actions/users.action"
import { SignUpDialog } from "../signup/signup.dialog"

/* Signin as guest */
@Component({
    selector: 'signin-as-guest-dialog',
    templateUrl: './signin-as-guest.dialog.html'
  })
  export class SigninAsGuestDialog {
    constructor(private dialog : MatDialog, 
                private userService : UserService,  
                private dRef : MatDialogRef<SigninAsGuestDialog>, 
                private store: Store<{ auth: any }>,
                @Inject(MAT_DIALOG_DATA) public tableId : string) {}
    
    signUpAsGuestForm = new FormGroup({
      display_name : new FormControl(null),
      isSpector : new FormControl(false)
    })
  
    onLogin(){
      this.dialog.open(SignUpDialog)
    }
  
    onSignUpAsGuestSubmit(){
      // console.log(this.tableId)
      
      let form_data = this.signUpAsGuestForm.value
  
      this.userService.signupAsGuest(form_data.display_name, this.tableId, form_data.isSpector ).subscribe(
        item => {
          this.store.dispatch(userSignAction({ payload: item }))
          // không lưu storage với user guest
          localStorage.setItem('userLogin', JSON.stringify(item));
          this.dRef.close({ item })
        }
      )
    }
  }
  
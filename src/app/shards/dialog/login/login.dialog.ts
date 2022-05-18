import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { isEmpty } from "lodash";
import { UserSignError } from "src/app/model/user-error.model";
import { UserService } from "src/app/service/users.service";
import { userSignAction } from "src/app/store/actions/users.action";

@Component({
  selector: "login-dialog",
  templateUrl: './login-dialog.dialog.html'
})
export class LoginDialog {
  //// Init Variable
  err: UserSignError = {
    error: ''
  };
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  @ViewChild("password", {static : false}) passwordRef : ElementRef | undefined;

  constructor(private userService: UserService, private dRef: MatDialogRef<LoginDialog>, private store: Store<{ auth: any }>) { }
  //// function
  onLoginSubmit() {
    let data = this.loginForm.value;
    if (data.email !== '' && data.password !== '') {
      this.userService.login(data.email, data.password).subscribe(
        item => {
          let data = (item as UserSignError).error
          if (data !== undefined) {
            this.err.error = data
          }
          else {
            this.store.dispatch(userSignAction({ payload: item }))
            localStorage.setItem('userLogin', JSON.stringify(item));
            this.dRef.close()
          }
        },
        err => {
          this.err = err.error;
        });

    } else {
      this.err = { error: "Database : (Error) Your email or your password must not empty" }
    }
  }

  onOpenSignUpDialog() {

  }

  onEyeDown(){
    let htmlPasswordRef = <HTMLInputElement>this.passwordRef?.nativeElement;
    htmlPasswordRef.type = 'text'
  }

  onEyeUp(){
    let htmlPasswordRef = <HTMLInputElement>this.passwordRef?.nativeElement;
    htmlPasswordRef.type = 'password'
  }


  isEmptyItem(item: any) {
    return isEmpty(item)
  }
}
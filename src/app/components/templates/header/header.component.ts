import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openLoginDialog(){
    this.dialog.open(LoginDialog)
  }
  openSignupDialog(){
    this.dialog.open(SignUpDialog)
  }
}


@Component({
  selector: "login-dialog",
  templateUrl: './login-dialog.dialog.html'
})
export class LoginDialog {}


@Component({
  selector: "signup-dialog",
  templateUrl: './signup-dialog.dialog.html'
})
export class SignUpDialog {}
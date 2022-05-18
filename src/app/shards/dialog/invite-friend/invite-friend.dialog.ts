import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {Clipboard} from '@angular/cdk/clipboard';

/* Invite Friend */
@Component({
    selector: 'invite-friend-diglog',
    templateUrl: './invite-friend.dialog.html',
  })
  export class InviteFriend {
    // get data from table page
    constructor(@Inject(MAT_DIALOG_DATA) public tableId : string, private clipboard : Clipboard) {}
  @ViewChild('gameUrl',{static : false}) gameUrl? : ElementRef; 

    invitationValue = window.location.href;

    onCopyLink(){
      const ip = <HTMLInputElement>this.gameUrl?.nativeElement;
      ip.select()
      this.clipboard.copy(this.invitationValue);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
  }
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

/* Invite Friend */
@Component({
    selector: 'invite-friend-diglog',
    templateUrl: './invite-friend.dialog.html',
  })
  export class InviteFriend {
    // get data from table page
    constructor(@Inject(MAT_DIALOG_DATA) public tableId : string) {}
    invitationValue = window.location.href;
  }
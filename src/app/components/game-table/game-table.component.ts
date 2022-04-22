import { ChangeDetectorRef, Component, ElementRef, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Table } from 'src/app/model/table.model';
import { TableService } from 'src/app/service/table.service';
import { UserService } from 'src/app/service/users.service';
import { userSignAction } from 'src/app/store/actions/users.action';
import { DeckComponent } from "../deck/deck.component"
import { LoginDialog, SignUpDialog } from '../templates/header/header.component';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/model/message.model';
import { UserResponse } from 'src/app/model/user-response.model';


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
        localStorage.setItem('userLogin', JSON.stringify(item));
        this.dRef.close({ item })
      }
    )
  }
}
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






/* Game Table */
@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit, OnChanges {
  id!: string | null;
  voting_sys_arr: string[] = ["1", "2", "3", "5", "8"];
  t? : Table;

  selected?: string
  deck_choose: DeckComponent = new DeckComponent();

  loc_set_group: number = 0;
  number_of_player: number = 0;
  $auth : UserResponse | undefined;
  stompClient : any;

  game_play: any[][] = [[],[],[],[]]

  /// users
  user_in_table: string[] = [];

  

  _connect(user : UserResponse, tableId : string){
    let socket = new SockJS('http://localhost:8080/ws')
    this.stompClient = Stomp.over(socket)
    this.user_in_table.push(user.id)
    const _this = this
    // connect
    _this.stompClient.connect({}, function() {
      // subscribe 
      _this.stompClient.subscribe("/topic/public", function (message : any) {
        _this._onReceivedMessage(message)
      })
      //user register 
      _this.stompClient.send("/app/add-user", {},  JSON.stringify({
        sender: user.id,
        messageType: 'JOIN',
        table: tableId
      }))
    })
  } 

  _disconnect(){
    
  }

  _sendMessage(){

  }

  /* how deck show on your table */
  showDeckOnTable(peoples : number[]) {
    let j = 0; 
    let max_side = 3;
    let deck = null;
    let table: any[] = [[],[],[],[]]
    for (let i = 0; i < peoples.length; i++) {
      deck = new DeckComponent()
      deck.isFlip = false
      deck.userOwner = peoples[i];
      table[j].push(deck)
      j++;
      if (j > max_side) {
        j = 0
      }
    }
    this.game_play = table;
    console.log(this.game_play)
  }


  _onReceivedMessage(message : any){
    let c: Message = JSON.parse(message.body);  
    let peoples
    if(this.stompClient && c){
      switch (c.messageType) {
        case 'JOIN':
        case 'LEAVE':
          peoples = JSON.parse(c.content);
          this.showDeckOnTable(peoples)
          // this.user_in_table.push(content.sender.id)
          // this.user_in_table.push(...content.content.split(','))

          // this.deck_choose.isFlip = false;
          // this.game_play[this.curr].push(this.deck_choose)
          //this.curr += 1;
        break;
        default:
          break;
      }
    }
  }


  constructor(private HtmlElement: ElementRef, 
              private dialog: MatDialog, 
              private route: ActivatedRoute, 
              private tableService: TableService, 
              private r : Router,
              private store: Store<{ auth: any }>) { }
  curr: number = 0;
  ngOnInit(): void {
    // updating....
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id === null) this.r.navigate(['/404'])
    else{
      /// get token
      let data = localStorage.getItem('userLogin');
      if(data !== null) {
            this.$auth = JSON.parse(data)
      } 
      
      if(this.$auth === undefined){
          this.store.select('auth').subscribe(item => this.$auth = item.auth)
      }

      this.tableService.findTableById(this.id).subscribe(resp => {        
        if(isEmpty(this.$auth)) {
          let dRef = this.dialog.open(SigninAsGuestDialog, { disableClose: true, data: this.id})
          dRef.afterClosed().subscribe(res => {
            this.$auth = res.item
            this._connect(this.$auth!, this.id!)
          })
        } else {
          this._connect(this.$auth!, this.id!)
        } 

        this.t = resp;
        this.voting_sys_arr = this.t.voting.split(',')
      })
    }
   
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  
  onOpenInvitePeople() {
    this.dialog.open(InviteFriend, {
      data : this.id
    })
  }
  ///////////// Fail
  // onCheckVotingHolder(){
  //   let holder = this.game_play;
  //   let idx = -1;
  //   for(let i = 0;i <= 3;i++){
  //     if(holder[i].length == 0) {
  //       idx = i;
  //       break;
  //     }
  //   }
  //   if(idx == -1){
  //     for(let i = 0;i <= 3;i++){
  //       // trường hợp 2 - 2 - 2 - 2

  //       if(holder[i].length % 2 == 1){
  //         idx = i;
  //         break;
  //       }
  //     }  
  //   }
  //   if(idx == -1) return 0;
  //   else return idx;
  // }

  onCheckVotingHolder(current: Number) {

  }


  onDeckSelected(item: string) {
    this.selected = item;
    // this.deck_choose.point = item;
    // this.deck_choose.isFlip = true;
   
    for(let i = 0;i < this.game_play.length;i++){
      for(let j = 0;j < this.game_play[i].length;j++){
        if(this.game_play[i][j].userOwner === this.$auth?.id){
          this.game_play[i][j].point = item
          this.game_play[i][j].isFlip = true
        }
      }
    }
    console.log(this.$auth?.id)
    console.log(this.game_play)
    // this.deck_choose.isFlip = this.deck_choose.isFlip === true ? false : true
    // if(this.curr > 3) this.curr = 0;
    // this.game_play[this.curr].push(new DeckComponent())
    // this.curr += 1;
    // return games;
  }
  onHandleReveal() {
    var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelector('.deck-unflip');
    targets?.classList.toggle('is-flipped')
  }
  onHandleInviteFriend() {
    this.dialog.open(InviteFriend)
  }
} 

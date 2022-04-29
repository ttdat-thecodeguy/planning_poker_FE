import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Table } from 'src/app/model/table.model';
import { TableService } from 'src/app/service/table.service';
import { DeckComponent } from "../../components/deck/deck.component"

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/model/message.model';
import { UserResponse } from 'src/app/model/user-response.model';
import { Issue } from 'src/app/model/issue.model';
import { IssueService } from 'src/app/service/issue.service';
import { SigninAsGuestDialog } from 'src/app/shards/dialog/signin-as-guest/signin-as-guest.dialog';
import { InviteFriend } from 'src/app/shards/dialog/invite-friend/invite-friend.dialog';
import { ImportIssueAsCSVDialog } from 'src/app/shards/dialog/import-issue-as-csv/import-issue-as-csv.dialog';
import { getAuthSpectorMode } from 'src/app/store/selectors/users.selectors';
import { UserService } from 'src/app/service/users.service';

/* Game Table */
@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  // table
  t: Table = {
    id: '',
    name: '',
    voting: '',
    userOwerId: 0,
    issues: [],
    isShowCardByOwner: false
  };
  id!: string | null;
  game_play: any[][] = [[], [], [], []]
  voting_sys_arr: string[] = ["1", "2", "3", "5", "8"];
  isSpectatorMode: boolean = false

  // another varibales
  selected?: string
  stompClient: any;
  isDone: boolean = false;

  /// users
  $auth: UserResponse | undefined;

  /// issue
  isIssueOpen: boolean = false;
  issues_arr: Issue[] = [];
  issueForm = new FormGroup({
    title: new FormControl("")
  })
  //// thống kê
  result: { [point: string]: number } = {};

  constructor(private HtmlElement: ElementRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private tableService: TableService,
    private issueService: IssueService,
    private userService: UserService,
    private r: Router,
    private store: Store<{ auth: any }>) { }
  ngOnInit(): void {
    // updating....
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === null) this.r.navigate(['/404'])
    else {
      /// get token
      let data = localStorage.getItem('userLogin');
      if (data !== null) {
        this.$auth = JSON.parse(data)
      }

      if (this.$auth === undefined) {
        this.store.select('auth')
          .subscribe(item => {
            // console.log(item) // send data cho switch spectator
            this.$auth = item.auth
          })
      }
      //theo dõi trạng thái của auth spector mode
      this.store.pipe(select(getAuthSpectorMode)).subscribe(item => {
        if (item !== null && item !== undefined && this.stompClient !== undefined) {
          //require location of this user deck 
          const dataSender: Message = {
            sender: this.$auth!.id,
            table: this.t?.id,
            content: `${this.iS} - ${this.jS}`,
            messageType: ''
          }

          if (item === true) {
            dataSender.messageType = 'ACTIVE_SPECTATOR'
            this.stompClient.send("/app/activate-spectator", {}, JSON.stringify(dataSender))
          }
          else {
            dataSender.messageType = 'DEACTIVATE_SPECTATOR'
            this.stompClient.send("/app/deactivate-spectator", {}, JSON.stringify(dataSender))
          }
          this.isSpectatorMode = item;
        }
      })

      ///////// load table trước 
      this.tableService.findTableById(this.id).subscribe(resp => {
        this.t = resp;
        this.issueService.findListIssueByTableId(this.id!).subscribe(resp => {
          this.issues_arr = resp
        })
        this.voting_sys_arr = this.t.voting.split(',')
      })
      //// mở dialog sau
      if (isEmpty(this.$auth)) {
        let dRef = this.dialog.open(SigninAsGuestDialog, { disableClose: true, data: this.id })
        dRef.afterClosed().subscribe(res => {
          this.$auth = res.item
          /// trong trường hợp table chưa có owner ==> mới tạo
          if (this.$auth && this.t.userOwerId === null) {
            this.t.userOwerId = this.$auth.id;
          }
          this._connect(this.$auth!, this.id!)
        })
      } else {
        this._connect(this.$auth!, this.id!)
      }
    }
  }
  //// Socket function
  // --- connect
  _connect(user: UserResponse, tableId: string) {
    let socket = new SockJS('http://localhost:8080/ws')
    this.stompClient = Stomp.over(socket)
    const _this = this
    // connect
    _this.stompClient.debug = null // remove or add this line in future

    _this.stompClient.connect({}, function () {
      // subscribe 
      _this.stompClient.subscribe("/topic/public", function (message: any) {
        _this._onReceivedMessage(message)
      })
      //user register 
      _this.stompClient.send("/app/add-user", {}, JSON.stringify({
        sender: user.id,
        messageType: 'JOIN',
        table: tableId
      }))
    })
  }
  // --- received message
  _onReceivedMessage(message: any) {
    let c: Message = JSON.parse(message.body);
    let dataReceive
    let arr;
    let x;
    let y;
    let item;

    if (this.stompClient && c && c.table === this.t?.id) {
      switch (c.messageType) {
        case 'JOIN':
          dataReceive = JSON.parse(c.content);
          this.showDeckOnTable(dataReceive)
          break;
        case 'LEAVE':
          console.log("Call Message Leave");
          this.onRemoveItemInTable(c.sender);
          break;
        case 'SELECTED':
          /// remove all space and split
          arr = c.content.replace(/ /g, '').split("-");
          x = Number(arr[0]), y = Number(arr[1]), item = arr[2];
          // nếu gửi đến đúng table
          if (this.game_play[x][y] !== undefined) {
            this.game_play[x][y].point = item;
            this.game_play[x][y].isFlip = true;
          }
          // this.game_play[]  
          break;
        case 'UNSELECTED_CARD':
          /// remove all space and split
          arr = c.content.replace(/ /g, '').split("-");
          x = Number(arr[0]), y = Number(arr[1])
          if (this.game_play[x][y] !== undefined) {
            this.game_play[x][y].point = undefined;
            this.game_play[x][y].isFlip = false;
          }
          break;
        case 'ACTIVE_SPECTATOR':
          /// remove all space and split
          arr = c.content.replace(/ /g, '').split("-");
          x = Number(arr[0]), y = Number(arr[1])
          if (this.game_play[x][y] !== undefined) {
            this.game_play[x][y].SpectatorMode = true;
            this.game_play[x][y].isFlip = false;
            this.game_play[x][y].point = undefined;
          }
          break
        case 'DEACTIVATE_SPECTATOR':
          /// remove all space and split
          arr = c.content.replace(/ /g, '').split("-");
          x = Number(arr[0]), y = Number(arr[1])
          if (this.game_play[x][y] !== undefined) {
            this.game_play[x][y].SpectatorMode = false;
            this.game_play[x][y].isFlip = false;
            this.game_play[x][y].point = undefined;
          }
          break
        case 'SHOW_CARD':
          dataReceive = JSON.parse(c.content);
          this.isDone = true
          this.result = dataReceive;

          var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelectorAll('.deck-unflip');
          targets.forEach(item => {
            item.classList.add('is-flipped')
          })
          break
        case 'START_NEW_VOTE':
          this.selected = undefined;
          var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelectorAll('.is-flipped');
          targets.forEach(item => {
            item.classList.remove('is-flipped')
          })

          this.isDone = false
          this.initTable()
          break
        case 'START_NEW_VOTE_WITH_ISSUE':

          break
        default:
          break;
      }
    }
  }
  //// User function
  onFindLocationOfDeck(sender: number) {
    let iS = -1, jS = -1;
    for (let i = 0; i < this.game_play.length; i++) {
      for (let j = 0; j < this.game_play[i].length; j++) {
        if (this.game_play[i][j].userOwner === sender) {
          iS = i;
          jS = j;
          break;
        }
      }
    }
    return [iS, jS];
  }
  /* how delete item from index */
  onRemoveItemInTable(sender: number) {
    const [x, y] = this.onFindLocationOfDeck(sender)
    this.game_play[x].splice(y, 1)
  }
  /* how deck show on your table */
  showDeckOnTable(dataReceive: any[]) {
    let j = 0;
    let max_side = 3;
    let deck = null;
    let table: any[] = [[], [], [], []]
    for (let i = 0; i < dataReceive.length; i++) {
      deck = new DeckComponent()
      deck.isFlip = dataReceive[i].tuple[0].isFlip;
      deck.userOwner = dataReceive[i].tuple[0].id.userId;
      deck.userOwnerName = dataReceive[i].tuple[1];
      deck.SpectatorMode = dataReceive[i].tuple[0].isSpectator
      if (dataReceive[i].tuple[0].item !== undefined) {
        deck.point = dataReceive[i].tuple[0].item.trim();
      }
      table[j].push(deck)
      j++;
      if (j > max_side) {
        j = 0
      }
    }
    this.game_play = table;
  }
  /* How invite people */
  onOpenInvitePeople() {
    this.dialog.open(InviteFriend, {
      data: this.id
    })
  }
  /* button deactivate when spectator mode is on */
  onDeativateSpectator() {
    this.userService.activeSpectatorMode(false);
  }
  /* init all table when start new voting */
  initTable(){
    for (let i = 0; i < this.game_play.length; i++) {
      for (let j = 0; j < this.game_play[i].length; j++) {
        this.game_play[i][j].point = undefined
        this.game_play[i][j].isFlip = false;
      }
    }
  }
  /* build the result */
  onBuildResult() {
    let deck_result: { [point: string]: number } = {}

    for (let i = 0; i < this.game_play.length; i++) {
      for (let j = 0; j < this.game_play[i].length; j++) {
        let deck = this.game_play[i][j];

        if (deck.point !== undefined) {
          if (deck.point in deck_result) {
            let data = deck_result[deck.point] + 1;
            deck_result[deck.point] = data;
          } else {
            deck_result[deck.point] = 1;
          }
        }
      }
    }
    this.result = deck_result;
  }
  iS: number = 0
  jS: number = 0
  tick: number = -1;
  /* Function when deck selected */
  onDeckSelected(item: string) {
    let isSelectedOnSameItem = false;

    if (this.selected === item) {
      this.selected = undefined;
      isSelectedOnSameItem = true;
    } else {
      this.selected = item;
      isSelectedOnSameItem = false;
    }
    // this.deck_choose.point = item;
    // this.deck_choose.isFlip = true;
    // let iS = -1, jS = -1;
    for (let i = 0; i < this.game_play.length; i++) {
      for (let j = 0; j < this.game_play[i].length; j++) {
        if (this.game_play[i][j].userOwner === this.$auth?.id) {
          if (isSelectedOnSameItem) {
            this.game_play[i][j].point = undefined
            this.game_play[i][j].isFlip = false
          } else {
            this.game_play[i][j].point = item
            this.game_play[i][j].isFlip = true
          }
          this.iS = i;
          this.jS = j;
          break;
        }
      }
    }
    //// require location of inner user
    if (!isSelectedOnSameItem) {
      this.stompClient.send("/app/selected-card", {}, JSON.stringify({
        sender: this.$auth?.id,
        messageType: 'SELECTED',
        table: this.t?.id,
        content: `${this.iS} - ${this.jS} - ${item}`
      }))
    } else {
      this.stompClient.send("/app/unselected-card", {}, JSON.stringify({
        sender: this.$auth?.id,
        messageType: 'UNSELECTED_CARD',
        table: this.t?.id,
        content: `${this.iS} - ${this.jS}`
      }))
    }
  }
  /* when click reveal / show cards button */
  onHandleReveal() {
    let timer_end = 3;
    this.tick = 3;

    /// build result
    this.onBuildResult()
    // set flag

    /// query selector 
    let decks = (<HTMLElement>this.HtmlElement.nativeElement).querySelectorAll('#decklist .deck');
    decks.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
      })
      let i = (item as HTMLElement)
      i.style.color = "rgb(92 91 91)"
      i.style.border = "1px solid rgb(92 91 91)"
      i.style.pointerEvents = "none"
      i.style.cursor = "default"
    })

    //deck-selected
    let deck_selected = (<HTMLElement>this.HtmlElement.nativeElement).querySelector("#decklist .deck-selected");
    deck_selected?.setAttribute('style', 'background-color: rgb(92 91 91) !important; border: 1px solid rgb(92 91 91) ')
    
    let timer = setInterval(() => {
      this.tick -= 1;
      if (this.tick === 0) {
        clearInterval(timer)

        this.isDone = true;
        this.selected = undefined
        /// send data
        this.stompClient.send("/app/show-card", {}, JSON.stringify({
          sender: this.$auth?.id,
          messageType: 'SHOW_CARD',
          table: this.t?.id,
          content: JSON.stringify(this.result)
        }))


        var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelectorAll('.deck-unflip');
        targets.forEach(item => {
          item.classList.add('is-flipped')
        })
        this.tick = -1;
      }
    }, timer_end * 200)

    // if(this.tick === 0){
    //   clearInterval(timer)
    // }
  }
  /* useful func */
  rechangeDictToArr() {
    return Object.keys(this.result)
  }
  /// get length of dict
  getLengthOfDict() {
    return Object.keys(this.result).length;
  }
  /// counting all count of result -> to count percent
  getAllCountOfResult() {
    return Object.values(this.result).reduce((a, b) => a + b)
  }
  // counting percent of length voting --> BUG
  getPercentOfDeck(count: number) {
    return ((count / this.getAllCountOfResult() * 100))
  }
  // handle button invite friend
  onHandleInviteFriend() {
    this.dialog.open(InviteFriend)
  }
  // handle button start voting
  onStartNewVoting() {
    // this.isDone = false;
    var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelector('.is-flipped');
    targets?.classList.remove('is-flipped')

    //// require location of inner user
    this.isDone = false
    this.initTable()


    this.stompClient.send("/app/start-new-vote", {}, JSON.stringify({
      sender: this.$auth?.id,
      messageType: 'START_NEW_VOTE',
      table: this.t?.id,
      content: ''
    }))
  }
  /* Handle Issue Side */
  onOpenAddIssue() {
    this.isIssueOpen = true;
  }
  onCloseIssue() {
    this.isIssueOpen = false;
  }
  onSaveIssue() {
    let titleIssue = this.issueForm.value.title;
    this.issueService.addIssue(titleIssue, null, null, null, this.id!).subscribe(resp => {
      this.issues_arr.push(resp);
    });

    this.onCloseIssue();
  }
  onOpenUploadAsCSV() {
    let dRefImportIssue = this.dialog.open(ImportIssueAsCSVDialog, {
      data: this.id
    })
    dRefImportIssue.afterClosed().subscribe(res => {
      this.issues_arr.push(...res.item)
    })
  }
  onRemoveAllIssue(){

    

    this.issues_arr = []
  }
} 

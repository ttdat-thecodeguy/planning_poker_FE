import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DeckComponent } from "../deck/deck.component"

@Component({
  selector: 'invite-friend-diglog',
  templateUrl: './invite-friend.dialog.html',
})
export class InviteFriend {
  constructor(){}
}

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit,OnChanges {
  voting_sys_arr: string[] = ["1","2","3","5","8"];
  selected?: string
  deck_choose : DeckComponent = new DeckComponent();
  game_play : any[] = [
    [],
    [],
    [],
    []
  ]
  loc_set_group: number = 0;
  number_of_player: number = 0;
  constructor(private HtmlElement : ElementRef, private dialog : MatDialog, private cdr : ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  /* If you need to simulatous how deck show on your table */
  showDeckOnTableSimulatous(){
    let j = 0; let max_side = 3;
    for(let i = 1;i <= this.number_of_player;i++){
      this.game_play[j].push(DeckComponent)
      j++;
      if(j > max_side){
        j = 0
      }
    }
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
  
  onCheckVotingHolder(current : Number){
    
  }
  curr : number = 0;
  ngOnInit(): void {
    // updating....
    this.game_play[this.curr].push(this.deck_choose)
    this.curr += 1;

  }
  onDeckSelected(item : string){
    // const games =  of(this.game_play[this.loc_set_group ]);
    this.selected = item;
    this.deck_choose.point = item;
    this.deck_choose.isFlip = true;
    

    if(this.curr > 3) this.curr = 0;
    this.game_play[this.curr].push(new DeckComponent())
    this.curr += 1;

      // return games;
  }
  onHandleReveal(){
    var targets = (<HTMLElement>this.HtmlElement.nativeElement).querySelector('.deck-unflip');
    targets?.classList.toggle('is-flipped')
  }
  onHandleInviteFriend(){
    this.dialog.open(InviteFriend)
  }
} 

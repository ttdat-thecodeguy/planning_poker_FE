import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VotingSys } from 'src/app/model/vote-sys.model';
import { VOTES } from "src/app/model/constants/vote-sys.constants";


@Component({
  selector: 'custom-deck',
  templateUrl: './custom-deck.dialog.html',
  styleUrls: ['./new-game.component.css']
})
export class CustomDeckDialog implements OnInit, OnChanges, DoCheck {
  voting_sys: string = "1,2,3,5,8";
  name: string = "";

  voting_sys_arr: string[] = ["1","2","3","5","8"];
  selected?: string
  ngOnInit(): void {}

  onVotingSystemInputChange(s : string){
    this.voting_sys = s;
    this.voting_sys_arr = this.voting_sys.split(",",-1);
  }
  onCustomNameDeckChange(s : string){
    this.name = s;
  }
  isNumber(value : number) {
    return Number.isNaN(value);
  }

  // customDeck = this.formBuilder.group({
  //   name: '',
  //   voting_sys: ''
  // })

  constructor(private dRef : MatDialogRef<CustomDeckDialog>){}
  ngDoCheck(): void {}
  ngOnChanges(changes: SimpleChanges): void {} // for @input
  onDeckSelected(item :string){
    this.selected = item;
  }
  checkDeckValues(item : string){
    return item.length <= 3 ? true : false;
  }

  // hành động này sẽ close form và send data
  onHandleSubmitCustomDeck(){
    this.dRef.close({ data : { 
      name : this.name, 
      voting_sys: this.voting_sys } })
  }
  

}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  chooseVoting: string = "0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?";
  //init value
  votings: VotingSys[] = VOTES;


  ngOnInit(): void {
  }
  constructor(private dialog : MatDialog){}
  onCustomDeck(){
    let dRef = this.dialog.open(CustomDeckDialog)
    // subscribe data
    dRef.afterClosed().subscribe(res => {
      this.votings.push({
        name: `Custom Deck ${this.votings.length} ( ${res.data.voting_sys} )`,
        voting_sys:  res.data.voting_sys
      })
    }) 
  }
}

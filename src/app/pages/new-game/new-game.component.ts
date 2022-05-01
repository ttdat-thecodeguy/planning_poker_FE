import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VotingSys } from 'src/app/model/vote-sys.model';
import { VOTES } from "src/app/model/constants/constants";
import { FormBuilder } from '@angular/forms';
import { TableService } from 'src/app/service/table.service';
import { Router } from '@angular/router';
import { CustomDeckDialog } from 'src/app/shards/dialog/custom-deck/custom-deck.dialog';




@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  //init value
  votings: VotingSys[] = VOTES;
  newGameForm = this.formBuilder.group({
    name: "",
    voting: "0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?",
    isShowCardByOwner: "true"
  })

  ngOnInit(): void {
  }
  constructor(private dialog : MatDialog, private formBuilder : FormBuilder, private tableService : TableService, private router : Router){}

  onNewGameSubmit(){
    let data = this.newGameForm.value;
    this.tableService.createTable(data).subscribe(
    item => {
      ///send name to link as state
      this.router.navigate(['/table', item.id], { state : { tableName : data.name === '' ? item.name : data.name } })
    })
  }


  onCustomDeck(){
    let dRef = this.dialog.open(CustomDeckDialog)
    // subscribe data
    dRef.afterClosed().subscribe(res => {
      this.votings.push({
        name:  res.data.name === "" ? `Custom Deck ${this.votings.length} ( ${res.data.voting_sys} )` : `${res.data.name} ( ${res.data.voting_sys} )`,
        voting_sys:  res.data.voting_sys
      })
    }) 
  }
}

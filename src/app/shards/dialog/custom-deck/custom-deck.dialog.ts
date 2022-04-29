import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'custom-deck',
    templateUrl: './custom-deck.dialog.html'
  })
  export class CustomDeckDialog implements OnInit {
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
  
    onDeckSelected(item :string){
      this.selected = item;
    }
    checkDeckValues(item : string){
      return item.length <= 3 ? true : false;
    }
  
    // hành động này sẽ close form và send data
    onHandleSubmitCustomDeck(){
      let data = { 
        name : this.name, 
        voting_sys: this.voting_sys }
      this.dRef.close({ data })
    }
  }
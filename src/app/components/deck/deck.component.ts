import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserResponse } from 'src/app/model/user-response.model';

@Component({
  selector: 'deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnChanges {
  @Input() point?: string;
  @Input() selected?: boolean;
  @Input() isFlip: boolean | undefined;
  @Input() userOwner?: number
  @Input() SpectatorMode : boolean = false;
  @Input() userOwnerName? : string 
  

  /// isDone 
  @Input() isGameEnd : boolean = false


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
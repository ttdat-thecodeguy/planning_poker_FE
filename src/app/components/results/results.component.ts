import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],

  animations: [
    trigger('flow' , [
      // state('appear', style({
      //   transform: 'translateY(40px)',
      //   opacity: 0.4
      // })),
      // state('ready', style({
      //   transform: 'translateY(0)',
      //   opacity: 1
      // })),
      
      transition(':enter', [
        style({
          transform: 'translateY(40px)',
          opacity: 0.4
        }),
        animate('0.4s', style({transform: 'translateY(0)', opacity : 1}))
      ]), 
      transition(':leave', [
        animate('0.4s', style({
          transform: 'translateY(40px)',
          opacity: 0.4
        }))
      ])

    ])
  ]

})
export class ResultsComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }



  @Input() result: { [point: string]: number } = {};


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
}

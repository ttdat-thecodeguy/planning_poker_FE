import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'planning_poker';

    $auth : any
    constructor(store: Store<{ auth: any }>   ){
        let data = localStorage.getItem('userLogin');
        if(data !== null) {
            this.$auth = JSON.parse(data)
        }
        
        if(this.$auth === undefined){
          store.select('auth').subscribe(item => this.$auth = item.auth)
        }
    }
    ngOnInit(): void {
        
    }
}

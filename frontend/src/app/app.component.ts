import { Component } from '@angular/core';
import {Fruit, PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fruits:Array<Fruit> = [];
  hasQueried: Boolean = false;
  constructor(private service: PostsService) {
  }
  sendData(event: any) {
    let query = event.target.value;


    if (query && query.trim().length < 1) {
      this.fruits = [];
      this.hasQueried = false;
      return; // only spaces
    }
    console.log('Input: ' + query);
    this.service.searchFruits(query.trim()).subscribe(results => {
      this.fruits = results;
      this.hasQueried = true;
     // console.log('Results ' + this.fruits )
    })
  }

}

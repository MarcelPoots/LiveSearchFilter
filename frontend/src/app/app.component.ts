import { Component } from '@angular/core';
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: PostsService) {
  }
  sendData(event: any) {
    let query = event.target.value;
    console.log(query);
    this.service.searchFruits(query.trim()).subscribe(results => {
      console.log('Results ' + results)
    })
  }

}

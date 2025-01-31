import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from 'rxjs/operators'

export interface Fruit {
  _id: string,
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  searchFruits(query : string){
    return this.http.post<{payload: Array<Fruit>}>('http://localhost:3000/api/search', {search: query}, {
      headers: new HttpHeaders({'Content-Type': 'application/json',

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'})
    }).pipe(
      map(data =>  data.payload)
    )

  }
}

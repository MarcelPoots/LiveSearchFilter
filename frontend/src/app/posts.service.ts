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
    return this.http.post<{payload: string}>('http://localhost:3000/api/search', {payload: query}, {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'})
    }).pipe(
      map(data => data.payload)
    )
  }
}

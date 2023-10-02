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
    return this.http.post<{payload: string}>('/api/search', {payload: query}, {
      headers: new HttpHeaders({'Content-Type': 'text/plain charset=UTF-8'})
    }).pipe(
      map(data => data.payload)
    )
  }
}

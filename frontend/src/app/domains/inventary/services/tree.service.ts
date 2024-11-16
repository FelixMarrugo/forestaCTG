import { inject, Injectable } from '@angular/core';
import {Tree} from './../models/tree.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private http = inject(HttpClient);
  constructor() { }

  private apiUrl = environment.apiUrl;
  private complementUrl='/inventary';
  getTrees(){
    console.log(this.apiUrl);
    return this.http.get<Tree[]>(`${this.apiUrl}`+this.complementUrl);
    //return this.http.get<User[]>('http://localhost:8100/users');
  }
}

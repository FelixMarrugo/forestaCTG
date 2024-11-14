import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  constructor() { }

  private apiUrl = environment.apiUrl;
  private complementUrl='/users';
  getUsers(){
    console.log(this.apiUrl);
    return this.http.get<User[]>(`${this.apiUrl}`+this.complementUrl);
  }
}

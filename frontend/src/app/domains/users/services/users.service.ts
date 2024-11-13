import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  //users = signal<User[]>([]);
  constructor() { }

  getUsers(){
    return this.http.get<User[]>('http://localhost:3000/users');
  }
}

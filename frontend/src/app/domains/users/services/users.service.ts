import { inject, Injectable, signal } from '@angular/core';
import { CreateUserDTO, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  createUser(user: { status: boolean; name?: string | null | undefined; email?: string | null | undefined; password?: string | null | undefined; }) {
    throw new Error('Method not implemented.');
  }

  private http = inject(HttpClient);
  constructor() { }

  private apiUrl = environment.apiUrl;
  private complementUrl='/users';
  getUsers(){
    //console.log(this.apiUrl);
    return this.http.get<User[]>(`${this.apiUrl}`+this.complementUrl);
    //return this.http.get<User[]>('http://localhost:8100/users');
  }
  create(user: CreateUserDTO){
    return this.http.post<CreateUserDTO>(`${this.apiUrl}`+this.complementUrl, user);
  }

  getUser(correo:string){
    return this.http.get<User[]>(`${this.apiUrl}`+this.complementUrl+'/'+correo);
  }
}

import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private complementUrl='/users';
  getUser(email:string){
      //console.log(this.apiUrl);
      return this.http.get(`${this.apiUrl}`+this.complementUrl+'/filter/'+email);
      //return this.http.get<User[]>('http://localhost:8100/users');
    }

  }

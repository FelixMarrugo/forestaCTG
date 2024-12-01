import { inject, Injectable } from '@angular/core';
import { Tree, UpdateTreeDTO,CreateTreeDTO } from './../models/tree.model';
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

  create(dto: CreateTreeDTO){
    return this.http.post<Tree>(`${this.apiUrl}`+this.complementUrl, dto);
  }

  update(id:string, dto: UpdateTreeDTO){
    return this.http.put<UpdateTreeDTO>(`${this.apiUrl}${this.complementUrl}/${id}`, dto);
  }

  getOne(id: string){
    console.log('Respuesta', this.http.get<Tree>(`${this.apiUrl}${this.complementUrl}/${id}`));
    console.log('url: ', `${this.apiUrl}${this.complementUrl}/${id}`);
    return this.http.get<Tree>(`${this.apiUrl}${this.complementUrl}/${id}`);
  }
}

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
    console.log(`Url: ${this.apiUrl}${this.complementUrl}`);
    return this.http.get<Tree[]>(`${this.apiUrl}`+this.complementUrl);
  }

  create(dto: CreateTreeDTO){
    console.log('dto: ', dto);
    console.log(this.http.post<Tree>(`${this.apiUrl}`+this.complementUrl, dto));
    return this.http.post<Tree>(`${this.apiUrl}`+this.complementUrl, dto);
  }

  update(id:string, dto: UpdateTreeDTO){
    return this.http.put<UpdateTreeDTO>(`${this.apiUrl}${this.complementUrl}/${id}`, dto);
  }

  getOne(id: string){
    return this.http.get<Tree>(`${this.apiUrl}${this.complementUrl}/${id}`);
  }
}

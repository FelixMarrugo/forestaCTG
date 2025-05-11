import { inject, Injectable } from '@angular/core';
import { Tree, UpdateTreeDTO, CreateTreeDTO } from './../models/tree.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  private http = inject(HttpClient);
  constructor() {}

  private apiUrl = environment.apiUrl;
  private complementUrl = '/inventary/';
  getTrees():Observable<any> {
    console.log(`Url: ${this.apiUrl}${this.complementUrl}`);
    return this.http.get<Tree[]>(`${this.apiUrl}` + this.complementUrl);
  }

  getTreesFilter(ids: string[]): Observable<any> {
    const url = `${this.apiUrl}${this.complementUrl}filter/trees`;
    console.log(`Url: ${url}`);
    return this.http.post<Tree[]>(url, {
      id: ids,
    });
  }
  create(dto: CreateTreeDTO) {
    console.log('dto: ', dto);
    console.log(
      this.http.post<Tree>(`${this.apiUrl}` + this.complementUrl, dto)
    );
    return this.http.post<Tree>(`${this.apiUrl}` + this.complementUrl, dto);
  }

  update(id: string, dto: UpdateTreeDTO) {
    return this.http.put<UpdateTreeDTO>(
      `${this.apiUrl}${this.complementUrl}disable/${id}`,
      dto
    );
  }

  enable(id: string, dto: UpdateTreeDTO) {
    return this.http.put<UpdateTreeDTO>(
      `${this.apiUrl}${this.complementUrl}enable/${id}`,
      dto
    );
  }

  getOne(id: string) {
    return this.http.get<Tree>(`${this.apiUrl}${this.complementUrl}${id}`);
  }
}

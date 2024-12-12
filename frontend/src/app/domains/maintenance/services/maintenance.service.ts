import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateMaintenanceDTO } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private complementUrl='/maintenance';

  create(dto: CreateMaintenanceDTO){
    console.log('dto: ', dto);
    console.log(this.http.post<CreateMaintenanceDTO>(`${this.apiUrl}`+this.complementUrl, dto));
    return this.http.post<CreateMaintenanceDTO>(`${this.apiUrl}`+this.complementUrl, dto);
  }
}
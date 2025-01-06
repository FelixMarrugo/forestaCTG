import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateMaintenanceDTO, Maintenance } from '../models/maintenance.model';
import {
  CreateScheduledMaintenanceDTO,
  ScheduledMaintenance,
} from '../models/scheduledMaintenance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor() {}

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private complementUrl = '/maintenance';

  create(dto: CreateMaintenanceDTO) {
    console.log('dto: ', dto);
    console.log(
      this.http.post<CreateMaintenanceDTO>(
        `${this.apiUrl}` + this.complementUrl,
        dto
      )
    );
    return this.http.post<CreateMaintenanceDTO>(
      `${this.apiUrl}` + this.complementUrl,
      dto
    );
  }
  get():Observable<any>{
    console.log(`Url: ${this.apiUrl}${this.complementUrl}`);
    return this.http.get<Maintenance[]>(`${this.apiUrl}` + this.complementUrl);
  }

  getOne(id: string) {
    return this.http.get<Maintenance>(
      `${this.apiUrl}${this.complementUrl}/${id}`
    );
  }
  getFilterNeiborhood(barrio: string) {
    const complement = '/inventary/filter/';
    return this.http.post(`${this.apiUrl}` + complement, {
      neighborhood: barrio,
    });
  }

  CreateScheduledMaintenance(body: CreateScheduledMaintenanceDTO) {
    const complement = '/scheduled-maintenance';
    return this.http.post(`${this.apiUrl}` + complement, body);
  }
  getScheduledMaintenance(id: string) {
    const complement = '/scheduled-maintenance';
    return this.http.get<ScheduledMaintenance[]>(
      `${this.apiUrl}` + complement + '/' + id
    );
  }
  getScheduledAll():Observable<any> {
    const complement = '/scheduled-maintenance';
    return this.http.get<ScheduledMaintenance[]>(`${this.apiUrl}` + complement);
  }

  updateScheduledMaintenance(id: string | undefined, body: string) {
    console.log('updateScheduledMaintenance');
    const complement = '/scheduled-maintenance';
    return this.http.put<ScheduledMaintenance>(
      `${this.apiUrl}` + complement + '/' + id,
      {description: body}
    );
  }
}

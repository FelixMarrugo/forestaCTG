import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AddMaintenanceComponent } from '../../components/add-maintenance/add-maintenance.component';
import { CardMaintenanceComponent } from '../../components/card-maintenance/card-maintenance.component';
import { Maintenance } from '../../models/maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    AddMaintenanceComponent,
    CardMaintenanceComponent,
  ],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  constructor() {}

  private maintenanceService = inject(MaintenanceService);
  maintenance = signal<Maintenance[]>([]);
    ngOnInit() {
      this.get();
    }

    get(){
      this.maintenanceService.get().subscribe({
        next: (response) => {
          console.log('fetching trees: ', response);
          this.maintenance.set(response);
        },
        error: (error) => {
          console.error('Error fetching trees:', error);
        }, // End of subscribe block
      });
    }
}

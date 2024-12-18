import { Component, inject, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TreeStadisticsComponent } from '../../components/tree-stadistics/tree-stadistics.component';
import { MaintenanceStaditicsComponent } from '../../components/maintenance-staditics/maintenance-staditics.component';
import { ScheduledsStadisticsComponent } from '../../components/scheduleds-stadistics/scheduleds-stadistics.component';
import { TreeService } from 'src/app/domains/inventary/services/tree.service';
import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { Maintenance } from 'src/app/domains/maintenance/models/maintenance.model';
import { MaintenanceService } from 'src/app/domains/maintenance/services/maintenance.service';
import { colorFill } from 'ionicons/icons';
import { ScheduledMaintenance } from 'src/app/domains/maintenance/models/scheduledMaintenance.model';

@Component({
  selector: 'app-stadistic',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TreeStadisticsComponent,
    MaintenanceStaditicsComponent,
    ScheduledsStadisticsComponent,
  ],
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.scss'],
})
export class StadisticComponent implements OnInit {
  constructor() {}
  private treeService = inject(TreeService);
  trees = signal<Tree[]>([]);

  private maintenanceService = inject(MaintenanceService);
  maintenance = signal<Maintenance[]>([]);

  schedules = signal<ScheduledMaintenance[]>([]);
  ngOnInit() {
    this.getTree();
    this.getMaintenance();
    this.getScheduleds();
    console.log('trees: ', this.trees());
    console.log('maintenance: ', this.maintenance());
    console.log('schedules: ', this.schedules());
  }

  getTree() {
    this.treeService.getTrees().subscribe({
      next: (response) => {
        console.log('fetching trees: ', response);
        this.trees.set(response);
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }

  getMaintenance() {
    this.maintenanceService.get().subscribe({
      next: (response) => {
        console.log('fetching Maintenance: ', response);
        this.maintenance.set(response);
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }

  getScheduleds() {
    this.maintenanceService.getScheduledAll().subscribe({
      next: async (response) => {
        console.log('Schedules: ', response);
        this.schedules.set(response);
      },
      error: async (error) => {
        console.error('Error creating: ', error);
      },
    });
  }
}

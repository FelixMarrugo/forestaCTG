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
import { ScheduledMaintenance } from 'src/app/domains/maintenance/models/scheduledMaintenance.model';
import { LbService } from 'src/app/domains/shared/services/lb.service';
import { MenuService } from 'src/app/domains/shared/services/menu.service';
import { SessionService } from 'src/app/domains/shared/services/session.service';
import { GeneralComponent } from '../../components/general/general.component';

@Component({
  selector: 'app-stadistic',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TreeStadisticsComponent,
    MaintenanceStaditicsComponent,
    ScheduledsStadisticsComponent,
    GeneralComponent
  ],
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.scss'],
})
export default class StadisticComponent implements OnInit {
  constructor(private sessionService: SessionService) {
    this.menuService.set(this.title)
  }
  title = 'Estadisticas';
  private lbService = inject(LbService);
  private treeService = inject(TreeService);
  trees = signal<Tree[]>([]);

  private maintenanceService = inject(MaintenanceService);
  maintenance = signal<Maintenance[]>([]);

  schedules = signal<ScheduledMaintenance[] | any>([]);
  localities: any[] = [];
  treeXlocalities: number[] = [];

  private menuService = inject(MenuService);

  async ngOnInit() {
    this.sessionService.checkSession();
    await this.getTree();
    //console.log('GetTree called');
    await this.getMaintenance();
    //console.log('getMaintenance called');
    await this.getScheduleds();
    //console.log('getScheduleds called');
  }

  //  getMaintenance() {
  //      this.maintenanceService.get().subscribe({
  //       next: (response) => {
  //         console.log('fetching Maintenance: ', response);
  //         this.maintenance.set(response);
  //       },
  //       error: (error) => {
  //         console.error('Error fetching trees:', error);
  //       }, // End of subscribe block
  //     });
  //   }


  // getScheduleds() {
  //   this.maintenanceService.getScheduledAll().subscribe({
  //     next: async (response) => {
  //       console.log('Schedules: ', response);
  //       this.schedules.set(response);
  //     },
  //     error: async (error) => {
  //       console.error('Error creating: ', error);
  //     },
  //   });
  // }
  async getScheduleds() {
    try {
      const response = await this.maintenanceService.getScheduledAll().toPromise();
      console.log('Schedules: ', response);
      this.schedules.set(response);
    } catch (error) {
      console.error('Error creating: ', error);
    }
  }

  async filterTree() {
    this.lbService.LB.forEach((item) => {
      console.log('item: ', item[0]);
      let l = this.trees().filter((value) => {
        return value.locality == item[0];
      });
      this.localities.push(l);
    });
    this.countTree();
    console.log('localities: ', this.localities);
  }

  async getTree() {
    try {
      const response = await this.treeService.getTrees().toPromise();
      console.log('fetching trees:', response);
      this.trees.set(response);
    } catch (error) {
      console.error('Error fetching trees:', error);
    }
    this.filterTree();
  }
  countTree() {
    this.treeXlocalities = this.localities.map((value) => {
      return value.length;
    });
    console.log('Localities map', this.localities);
  }

  async getMaintenance() {
    try {
      const response = await this.maintenanceService.get().toPromise();
      console.log('fetching Maintenance:', response);
      this.maintenance.set(response);
    } catch (error) {
      console.error('Error fetching Maintenance:', error);
    }
  }
}

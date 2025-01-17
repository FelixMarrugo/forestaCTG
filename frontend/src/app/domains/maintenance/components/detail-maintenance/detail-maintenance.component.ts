import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';

import { TreeService } from 'src/app/domains/inventary/services/tree.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenance } from '../../models/maintenance.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { ScheduledMaintenanceComponent } from '../scheduled-maintenance/scheduled-maintenance.component';
import {
  CreateScheduledMaintenanceDTO,
  ScheduledMaintenance,
} from '../../models/scheduledMaintenance.model';
import { ViewScheduledComponent } from '../view-scheduled/view-scheduled.component';
import { SessionService } from 'src/app/domains/shared/services/session.service';

@Component({
  selector: 'app-detail-maintenance',
  standalone: true,
  imports: [CommonModule, IonicModule, ScheduledMaintenanceComponent, ViewScheduledComponent], // Add any required modules here.
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['./detail-maintenance.component.scss'],
})
export class DetailMaintenanceComponent implements OnInit, OnChanges {
  private treeService = inject(TreeService);
  private maintenanceService = inject(MaintenanceService);

  id!: string;
  constructor(private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  schedules = signal<ScheduledMaintenance[]>([]);
  closeModal = false;
  maintenance = signal<Maintenance | null>(null);
  tree = signal<Tree[] | null>([]);
  get() {
    this.maintenanceService.getOne(this.id).subscribe({
      next: (response) => {
        console.log('fetching trees: ', response);
        this.maintenance.set(response);
        this.getFilterNeiborhood();
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      },
    });
  }

  ngOnInit(): void {
    this.sessionService.checkSession();
    this.id = this.route.snapshot.paramMap.get('id') ?? ''; // Now you can use treeId for your request and edit the tree//
    +{
      conversationId: '30e4fc25-5526-4d9c-97b1-b5f800250085',
      source: 'instruct',
    };
    console.log(this.id);
    this.get();
    this.getScheduleds();


  }
  getFilterNeiborhood() {
    console.log('neighborhood: ', this.maintenance()!.neighborhood);
    this.maintenanceService
      .getFilterNeiborhood(this.maintenance()!.neighborhood)
      .subscribe({
        next: async (response) => {
          console.log('Filtro: ', response);
          this.tree.set(response as Tree[]);
        },
        error: async (error) => {
          console.error('Error creating: ', error);
        },
      });
  }

  async createScheduledMaintenace(maintenance: CreateScheduledMaintenanceDTO) {
    this.maintenanceService.CreateScheduledMaintenance(maintenance).subscribe({
      next: async (response) => {
        console.log('Created: ', response);
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'El mantenimiento ha sido programado exitosamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.closeModal = true; // Redirige a la ruta deseada
                console.log('Se guardó');
                //location.reload();
              },
            },
          ],
        });
        await successAlert.present();
      },
      error: async (error) => {
        console.error('Error creating: ', error);
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message:
            'Ocurrió un error al programar el mantenimiento. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      },
    });
  }


  getScheduleds() {
    this.maintenanceService.getScheduledMaintenance(this.id).subscribe({
      next: async (response) => {
        console.log('Schedules: ', response);
        this.schedules.set(response);
      },
      error: async (error) => {
        console.error('Error creating: ', error);
      },
    });
  }

  findTreeInSchedule(valor: string) {
    const schedule =  this.schedules().find((s) => s.idTree === valor);
    return schedule;
  }

  ngOnChanges() {
    this.getScheduleds();
  }
}

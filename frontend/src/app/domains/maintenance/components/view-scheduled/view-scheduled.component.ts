import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { ScheduledMaintenance } from '../../models/scheduledMaintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-view-scheduled',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-scheduled.component.html',
  styleUrls: ['./view-scheduled.component.scss'],
})
export class ViewScheduledComponent implements OnInit {
  private maintenanceService = inject(MaintenanceService);
  private modalController = inject(ModalController);

  constructor(private alertController: AlertController) {}

  @Input() idModal: string = '';
  @Input() tree!: Tree;
  @Input() scheduled!: ScheduledMaintenance | undefined;

  scheduledMaintenanceEdit!: FormGroup; // Usa el operador de aserción no-null

  ngOnInit() {
    this.scheduledMaintenanceEdit = new FormGroup({
      description: new FormControl(this.scheduled?.description || ''),
    });
  }

  async editScheduledMaintenance() {
    console.log('Scheduled Maintenance');
    if (this.scheduledMaintenanceEdit.valid) {
      const description = this.scheduledMaintenanceEdit.value.description;
      const id = this.scheduled?._id;
      this.maintenanceService
        .updateScheduledMaintenance(id, description)
        .subscribe({
          next: async (response) => {
            const alert = await this.alertController.create({
              header: '¡Exito!',
              message: 'Se actualizó correctamente el registro.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.modalController.dismiss();
                  },
                },
              ],
            });
            await alert.present();
          },
          error: async (error) => {
            const alert = await this.alertController.create({
              header: 'Uy, algo salió mal, compa',
              message: 'No se pudo actualizar el mantenimiento programado.',
              buttons: ['OK'],
            });
            await alert.present();
          },
        });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { FormComponent } from './../form/form.component';
import { CreateMaintenanceDTO } from '../../models/maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-add-maintenance',
  standalone: true,
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss'],
  imports: [IonicModule, CommonModule, FormComponent],
})
export class AddMaintenanceComponent {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
  private maintenanceService = inject(MaintenanceService);
  title_schedule = 'Programar mantenimiento';
  description_schedule =
    'Llene todos los parametros para programar el mantenimiento';
  isModalOpen: Boolean = false;

  setOpen(isOpen: boolean) {
    console.log('setOpen: ', isOpen);
    this.isModalOpen = isOpen;
  }

  async createMaintenance(maintenance: CreateMaintenanceDTO) {
    this.maintenanceService.create(maintenance).subscribe({
      next: async (response) => {
        console.log('Created: ', response);
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'El mantenimiento ha sido programado exitosamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.setOpen(false); // Redirige a la ruta deseada
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
}

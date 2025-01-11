import { Component, inject } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TreeService } from '../../services/tree.service';
import { CreateTreeDTO } from '../../models/tree.model';
import { FormTreeComponent } from '../../components/form-tree/form-tree.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tree',
  standalone: true,
  templateUrl: './add-tree.component.html',
  styleUrls: ['./add-tree.component.scss'],
  imports: [IonicModule, CommonModule, FormTreeComponent],
})
export class AddTreeComponent {
  private treeService = inject(TreeService);

  title = 'ADD TREE';
  description = 'Debe llenar todos los campos';
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async createNewTree(tree: CreateTreeDTO) {
    const loading = await this.loadingController.create({
      message: 'Registrando árbol...',
      spinner: 'lines-sharp',
    });
    await loading.present();
    this.treeService.create(tree).subscribe({
      next: async (response) => {
        console.log('Created: ', response);
        await loading.dismiss();
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'El árbol ha sido registrado exitosamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/inventario']);
              },
            },
          ],
        });
        await successAlert.present();
      },
      error: async (error) => {
        console.error('Error creating: ', error);
        await loading.dismiss();
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message:
            'Ocurrió un error al crear el árbol. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      },
    });
  }
}

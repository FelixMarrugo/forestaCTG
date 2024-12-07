import { Component, inject } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
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
    private alertController: AlertController
  ) {}

  async createNewTree(tree: CreateTreeDTO) {
    console.log('createNewTree: ', tree); // Verificación de entrada

    const formData = new FormData();
    formData.append('location', tree.location);
    console.log('location', tree.location); // Verificación de datos
    formData.append('commonName', tree.commonName);
    formData.append('scientificName', tree.scientificName);
    formData.append('neighborhood', tree.neighborhood);
    formData.append('locality', tree.locality);
    formData.append('physicalDescription', tree.physicalDescription);
    formData.append('state', tree.state.toString()); // Convertir el estado a string

    if (tree.photo instanceof File) {
      formData.append('photo', tree.photo); // Añade el archivo al formulario
      console.log('Tiene un archivo', tree.photo);
    } else {
      formData.append('photo', ''); // Si no es un archivo, deja el campo vacío
    }

    // Verificar el contenido del FormData
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    this.treeService.create(formData).subscribe({
      next: async (response) => {
        console.log('Created: ', response);
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'El árbol ha sido registrado exitosamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/inventario']); // Redirige a la ruta deseada
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
          message: 'Ocurrió un error al crear el árbol. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      },
    });
  }
}

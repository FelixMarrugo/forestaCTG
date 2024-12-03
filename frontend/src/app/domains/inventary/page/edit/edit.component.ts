import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { FormTreeComponent } from '../../components/form-tree/form-tree.component';
import { Tree, UpdateTreeDTO } from '../../models/tree.model';
import { TreeService } from '../../services/tree.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [FormTreeComponent, IonicModule, CommonModule, ReactiveFormsModule],
})
export class EditComponent implements OnInit {
  title = 'EDIT TREE';
  treeId: string = '';
  tree: any;
  description = 'Llene los campos que desea modificar';
  private treeService = inject(TreeService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.treeId = this.route.snapshot.paramMap.get('id') ?? ''; // Now you can use treeId for your request and edit the tree//
    +{
      conversationId: '30e4fc25-5526-4d9c-97b1-b5f800250085',
      source: 'instruct',
    };
    console.log(this.treeId);
    this.getTreeId();
  }

  getTreeId() {
    console.log(this.tree);
    this.treeService.getOne(this.treeId).subscribe({
      next: (response) => {
        console.log('Tree: ', response);
        this.tree = response;
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }

  /*updateTree(tree: UpdateTreeDTO) {
    console.log('tree update: ', tree);
    this.treeService.update(this.treeId, tree).subscribe((response) => {
      console.log('Updated: ', response);
    });
  }*/
  async updateTree(tree: UpdateTreeDTO) {
    console.log('tree update: ', tree);
    this.treeService.update(this.treeId, tree).subscribe({
      next: async (response) => {
        console.log('Updated: ', response);
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'El árbol ha sido actualizado exitosamente.',
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
        console.error('Error updating: ', error);
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message:
            'Ocurrió un error al actualizar el árbol. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      },
    });
  }
}

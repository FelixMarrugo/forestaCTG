import { AfterViewInit, Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { IonicModule, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import DataTable from 'datatables.net-dt';

import { TreeService } from '../../services/tree.service';
import { Tree } from '../../models/tree.model';
import { GeneralComponent } from 'src/app/domains/stadistics/components/general/general.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [IonicModule, CommonModule, RouterLinkWithHref, GeneralComponent],
})
export class TableComponent implements OnInit, AfterViewInit {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      new DataTable('#myTable', {
        scrollX: true,
      });
    }, 1000);
  }

  trees = signal<Tree[]>([]);
  private treeService = inject(TreeService);
  ngOnInit() {
    this.treeDetails();
  }

  async treeDetails() {
    // Creamos el loading con progress bar
    const loading = await this.loadingController.create({
      spinner: 'circular',  // Spinner tipo reloj
      message: 'Cargando árboles de la ciudad: 0%',
      translucent: true,
      backdropDismiss: false,
      cssClass: 'progress-loading'
    });

    await loading.present();

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      loading.message = `Cargando árboles de la ciudad: ${progress}%`;

      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 5000);

    this.treeService.getTrees().subscribe({
      next: (response) => {
        console.log('fetching trees: ', response);
        this.trees.set(response);

        clearInterval(progressInterval);
        loading.dismiss();

        this.showToast('Árboles cargados correctamente', 'success');
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
        clearInterval(progressInterval);
        loading.dismiss();
        this.showToast('Error al cargar los árboles', 'danger');
      }
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  // Método para obtener el total de árboles
  getTotalTrees(): number {
    return this.trees().length;
  }

  // Método para obtener el conteo por barrios
  getTreesByNeighborhood(): { neighborhood: string, count: number }[] {
    const neighborhoodCount: { [key: string]: number } = {};

    this.trees().forEach(tree => {
      const neighborhood = tree.neighborhood || 'Sin barrio';
      neighborhoodCount[neighborhood] = (neighborhoodCount[neighborhood] || 0) + 1;
    });

    return Object.keys(neighborhoodCount).map(key => ({
      neighborhood: key,
      count: neighborhoodCount[key]
    }));
  }

  // Método para obtener el conteo por localidad
  getTreesByLocality(): { locality: string, count: number }[] {
    const localityCount: { [key: string]: number } = {};

    this.trees().forEach(tree => {
      const locality = tree.locality || 'Sin localidad';
      localityCount[locality] = (localityCount[locality] || 0) + 1;
    });

    return Object.keys(localityCount).map(key => ({
      locality: key,
      count: localityCount[key]
    }));
  }

  async disableTree(tree: Tree) {
    const alert = await this.alertController.create({
      header: 'Disable tree',
      message: '¿Estás seguro de deshabilitar este árbol?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: async () => {
            const cancelToast = await this.toastController.create({
              message: 'Proceso cancelado',
              duration: 2000,
              color: 'warning'
            });
            await cancelToast.present();
          }
        },
        {
          text: 'Disable tree',
          cssClass: 'alert-button-confirm',
          handler: async () => {

            const loading = await this.loadingController.create({
              spinner: 'lines',
              message: 'Desabilitando árbol...',
              translucent: true,
              backdropDismiss: false,
              cssClass: 'custom-loading',
              duration: 2000 // Opcional - si no se especifica, debes cerrarlo manualmente
            });

            await loading.present();

            const dto = {
              location: tree.location,
              commonName: tree.commonName,
              scientificName: tree.scientificName,
              neighborhood: tree.neighborhood,
              locality: tree.locality,
              physicalDescription: tree.physicalDescription,
              photo: tree.photo,
              state: false,
            };

            this.treeService.update(tree._id, dto).subscribe({
              next: async (response) => {

                tree.state = false;
                this.changeDetectorRef.detectChanges();

                await loading.dismiss();
                const successToast = await this.toastController.create({
                  message: 'Árbol deshabilitado correctamente',
                  duration: 2000,
                  color: 'success'
                });
                await successToast.present();
              },
              error: async (error) => {
                await loading.dismiss();
                const errorToast = await this.toastController.create({
                  message: 'Error al deshabilitar el árbol',
                  duration: 2000,
                  color: 'danger'
                });
                await errorToast.present();
                console.log('Error disabling tree:', error);
              },
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async enableTree(tree: Tree) {
    const alert = await this.alertController.create({
      header: 'Enable tree',
      message: '¿Estás seguro de habilitar este árbol?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: async () => {
            const cancelToast = await this.toastController.create({
              message: 'Proceso cancelado',
              duration: 2000,
              color: 'warning'
            });
            await cancelToast.present();
          }
        },
        {
          text: 'Enable tree',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            const loading = await this.loadingController.create({
              spinner: 'lines',
              message: 'Habilitando árbol...',
              translucent: true,
              backdropDismiss: false,
              cssClass: 'custom-loading',
              duration: 2000 // Opcional - si no se especifica, debes cerrarlo manualmente
            });

            await loading.present();
            const dto = {
              location: tree.location,
              commonName: tree.commonName,
              scientificName: tree.scientificName,
              neighborhood: tree.neighborhood,
              locality: tree.locality,
              physicalDescription: tree.physicalDescription,
              photo: tree.photo,
              state: true,
            };

            this.treeService.enable(tree._id, dto).subscribe({
              next: async (response) => {

                tree.state = true;
                this.changeDetectorRef.detectChanges();

                await loading.dismiss();
                const successToast = await this.toastController.create({
                  message: 'Árbol habilitado correctamente',
                  duration: 2000,
                  color: 'success'
                });
                await successToast.present();
              },
              error: async (error) => {
                await loading.dismiss();
                const errorToast = await this.toastController.create({
                  message: 'Error al habilitar el árbol',
                  duration: 2000,
                  color: 'danger'
                });
                await errorToast.present();
                console.log('Error enabling tree:', error);
              },
            });
          }
        }
      ]
    });
    await alert.present();
  }
}



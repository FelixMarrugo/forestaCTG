import { Component, OnInit, signal, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Tree } from '../../../inventary/models/tree.model';
import { TreeService } from 'src/app/domains/inventary/services/tree.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  constructor() { }

  trees = signal<Tree[]>([]);
  private treeService = inject(TreeService);
  ngOnInit() {
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
}

import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  signal,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { TreeService } from 'src/app/domains/inventary/services/tree.service';
import { ScheduledMaintenance } from 'src/app/domains/maintenance/models/scheduledMaintenance.model';

@Component({
  selector: 'app-scheduleds-stadistics',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './scheduleds-stadistics.component.html',
  styleUrls: ['./scheduleds-stadistics.component.scss'],
})
export class ScheduledsStadisticsComponent {
  //  ngAfterViewInit() {this.construirConjunto();}

  private treeService = inject(TreeService);
  @Input() Scheduled!: ScheduledMaintenance[];
  trees = signal<Tree[]>([]);
  ids!: string[];
  conjunto = signal([]);
  arbolesDocumentados!: {
    description: string | undefined;
    _id: string;
    location: string;
    commonName: string;
    scientificName: string;
    neighborhood: string;
    locality: string;
    physicalDescription: string;
    photo: string;
    state: string;
  }[];
  async getTreesFilter(ids: string[]) {
    try {
      const response = await this.treeService.getTreesFilter(ids).toPromise();
      console.log('Arboles documentados: ', response);
      this.trees.set(response);
    } catch (error) {
      console.error('Error fetching Maintenance:', error);
    }
  }
  /*const response
    this.treeService.getTreesFilter(ids).subscribe({
      next: (response) => {
        console.log('Arboles documentados: ', response);
        this.trees.set(response);
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }*/

  async construirConjunto() {
    console.log('sch: ', this.Scheduled);
    this.ids = this.Scheduled.map((elem) => elem.idTree);
    console.log('ids: ', this.ids);
    await this.getTreesFilter(this.ids);
    this.construirArbolConDescripcion();
  }

  listenerScheduled = setInterval(() => {
    console.log('Listener iniciado');
    if (this.Scheduled) {
      this.construirConjunto();
      clearInterval(this.listenerScheduled);
    } else {
      console.log('Scheduled not found');
    }
  }, 500);

  construirArbolConDescripcion() {
    this.arbolesDocumentados = this.trees().map((tree) => {
      const shc = this.Scheduled.find((sch) => {
        return sch.idTree === tree._id;
      })?.description;
      return { ...tree, description: shc };
    });
    console.log(this.arbolesDocumentados);
  }
}

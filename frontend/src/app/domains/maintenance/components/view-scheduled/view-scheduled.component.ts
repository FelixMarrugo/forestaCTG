import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { ScheduledMaintenance } from '../../models/scheduledMaintenance.model';

@Component({
  selector: 'app-view-scheduled',
  standalone:true,
  imports: [IonicModule, CommonModule],
  templateUrl: './view-scheduled.component.html',
  styleUrls: ['./view-scheduled.component.scss'],
})
export class ViewScheduledComponent{

  constructor() { }

  @Input() idModal:string = '';
  @Input() tree!: Tree;
  @Input() scheduled!: ScheduledMaintenance | undefined;

}

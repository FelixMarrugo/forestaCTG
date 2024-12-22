import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { ScheduledMaintenance } from '../../models/scheduledMaintenance.model';


@Component({
  selector: 'app-view-scheduled',
  standalone:true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-scheduled.component.html',
  styleUrls: ['./view-scheduled.component.scss'],
})
export class ViewScheduledComponent{

  constructor() { }

  @Input() idModal:string = '';
  @Input() tree!: Tree;
  @Input() scheduled!: ScheduledMaintenance | undefined;

  scheduledMaintenanceEdit = new FormGroup({
    description: new FormControl(),
  });


  editScheduledMaintenance(){
    
  }
}

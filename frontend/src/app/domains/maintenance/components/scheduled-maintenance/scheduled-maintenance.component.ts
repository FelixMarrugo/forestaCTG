import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Tree } from 'src/app/domains/inventary/models/tree.model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-scheduled-maintenance',
  standalone: true,
  templateUrl: './scheduled-maintenance.component.html',
  styleUrls: ['./scheduled-maintenance.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ScheduledMaintenanceComponent implements OnChanges{
  constructor() {}
  @Input() idMaintenance: string = '';
  @Input() tree!: Tree;
  @Input() close: boolean = false;
  @Output() ScheduledHandler = new EventEmitter();

  isModalOpen = this.close;

  scheduledMaintenanceForm = new FormGroup({
    scheduledMaintenanceDescription: new FormControl(''),
  });
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handler(): void {
    const maintenance = {
      idMaintenance: this.idMaintenance,
      idTree: this.tree._id,
      description:
        this.scheduledMaintenanceForm.value.scheduledMaintenanceDescription ??
        '',
    };
    this.ScheduledHandler.emit(maintenance);
  }

  ngOnChanges() {
    if (this.close == true) {
      this.setOpen(false);
      console.log('Se cerró el modal');
    }
  }
}

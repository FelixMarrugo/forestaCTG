import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AddMaintenanceComponent } from '../../components/add-maintenance/add-maintenance.component';

@Component({
  selector: 'app-maintenance',
  standalone:true,
  imports: [IonicModule, CommonModule, AddMaintenanceComponent],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent{

  constructor() { }

}


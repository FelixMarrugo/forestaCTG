import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-maintenance-staditics',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './maintenance-staditics.component.html',
  styleUrls: ['./maintenance-staditics.component.scss'],
})
export class MaintenanceStaditicsComponent {
  constructor() {}
  @Input() countMaintenance!: number;
}

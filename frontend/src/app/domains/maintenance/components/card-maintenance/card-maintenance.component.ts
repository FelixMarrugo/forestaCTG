import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Maintenance } from '../../models/maintenance.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-card-maintenance',
  standalone:true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref],  // Add any required modules here.
  templateUrl: './card-maintenance.component.html',
  styleUrls: ['./card-maintenance.component.scss'],
})
export class CardMaintenanceComponent {

  constructor() { }

  @Input() maintenance!: Maintenance;
  @Input() _id!: string;
  @Input() date!: string;
  @Input() description!: string;
  @Input() state!: Boolean;
  @Input() neighborhood!: string;

}

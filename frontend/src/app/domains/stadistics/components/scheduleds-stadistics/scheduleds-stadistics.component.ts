import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-scheduleds-stadistics',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './scheduleds-stadistics.component.html',
  styleUrls: ['./scheduleds-stadistics.component.scss'],
})
export class ScheduledsStadisticsComponent {
  constructor() {}
  @Input() countScheduled!: number;
}

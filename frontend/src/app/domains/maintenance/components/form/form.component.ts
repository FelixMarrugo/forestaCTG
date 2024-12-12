import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LbService } from 'src/app/domains/shared/services/lb.service';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormComponent {

  private lbService = inject(LbService);

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}
  @Input() title = '';
  @Input() decription = '';
  @Output() close = new EventEmitter();
  @Output() maintenanceEmit = new EventEmitter();


  maintenance = new FormGroup({
    neighborhood: new FormControl(),
    date: new FormControl(),
    description: new FormControl(),
    state: new FormControl(true),
  });

  async maintenance_handler() {
    if (
      this.maintenance.value.neighborhood != null &&
      this.maintenance.value.description != null &&
      this.maintenance.value.date != null &&
      this.maintenance.value.state != null
    ) {
      console.log(this.maintenance.value);
      console.log(this.maintenance.value);
      this.maintenanceEmit.emit(this.maintenance.value);
    }
  }

  barrios: string[] = this.lbService.setBarrios();
}

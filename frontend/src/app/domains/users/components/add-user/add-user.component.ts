import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.component.html',
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}
  private userService = inject(UsersService);
  addUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async createUser() {
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'lines-sharp',
    });
    await loading.present();
    const user = { ...this.addUser.value, status: true };
    this.userService.create(user).subscribe({
      next: async (response: any) => {
        console.log('Created: ', response);
        await loading.dismiss();
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: '😎 El usuario ha sido registrado exitosamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/users']);
              },
            },
          ],
        });
        await successAlert.present();
      },
      error: async (error: any) => {
        console.error('Error creating: ', error);
        await loading.dismiss();
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message:
            '😥Ocurrió un error al crear el usuario. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      },
    });
  }
}

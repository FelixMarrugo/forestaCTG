import { inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { User } from '../users/models/user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  private loginService = inject(LoginService);
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}
  // async login() {
  //   console.log('email: ', this.email);
  //   const user: User[] = await this.filterByEmail(this.email.toLowerCase());
  //   console.log('user: ', user);
  //   if (this.email == user[0].email && this.password == user[0].password) {
  //     // Replace this with your actual navigation logic
  //     sessionStorage.setItem('userId', `${user[0]._id}`);
  //     sessionStorage.setItem('userName', `${user[0].name}`);
  //     sessionStorage.setItem('userEmail', `${user[0].email}`);
  //     this.navCtrl.navigateRoot('/home');
  //   } else {
  //     // Handle login errors here
  //     alert('Invalid email or password');
  //   }
  //   if (sessionStorage.getItem('userId') == null) {
  //     this.navCtrl.navigateRoot('/login');me colgaste. no despues de 2horas se cuelgA AJAJAJAJA
  //   }
  // }

  async login() {
    console.log('email: ', this.email);
    const user: User[] = await this.filterByEmail(this.email.toLowerCase());
    console.log('user: ', user);
    if (this.email == user[0].email && this.password == user[0].password) {
      sessionStorage.setItem('userId', `${user[0]._id}`);
      sessionStorage.setItem('userName', `${user[0].name}`);
      sessionStorage.setItem('userEmail', `${user[0].email}`);
      this.showWelcomeAlert();
      this.navCtrl.navigateRoot('/home');
    } else {
      alert('Invalid email or password');
    }
    if (sessionStorage.getItem('userId') == null) {
      this.navCtrl.navigateRoot('/login');
    }
  }
  async filterByEmail(email: string): Promise<any> {
    try {
      const response = await this.loginService.getUser(email).toPromise();
      console.log('User filter: ', response);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }
  async showWelcomeAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Inicio de sesión exitoso.',
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1000);
  }
}

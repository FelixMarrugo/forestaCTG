import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

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
  constructor(private navCtrl: NavController) {}

  login() {
    if (this.email === 'test@example.com' && this.password === '123456') {
      // Replace this with your actual navigation logic
      this.navCtrl.navigateRoot('/home');
    } else {
      // Handle login errors here
      alert('Invalid email or password');
    }
  }
}

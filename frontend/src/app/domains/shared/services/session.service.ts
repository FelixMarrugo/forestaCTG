import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private navCtrl: NavController) {}
  checkSession() {
    if (sessionStorage.getItem('userId') == null) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  clearSession() {
    sessionStorage.removeItem('userId');
    this.navCtrl.navigateRoot('/login');
  }
}

import { Component, inject } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './../menu/menu.component';
import { FooterComponent } from './../footer/footer.component';
import { MenuService } from '../../services/menu.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule, MenuComponent, FooterComponent, RouterModule],
})
export class LayoutComponent {
  private menuService = inject(MenuService);
  title = this.menuService.get();

  constructor(private sessionService: SessionService, private alertController: AlertController) {}

  async logout() {
    this.sessionService.clearSession();
    const alert = await this.alertController.create({
      header: 'Hasta pronto 👍',
      message: 'Tu sesión ha sido cerrada exitosamente.',
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }
}

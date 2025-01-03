import { Component, inject } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './../menu/menu.component';
import {FooterComponent} from './../footer/footer.component';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule, MenuComponent, FooterComponent, RouterModule],
})
export class LayoutComponent {
  constructor() {}

  private menuService = inject(MenuService);
  title = this.menuService.get();
}

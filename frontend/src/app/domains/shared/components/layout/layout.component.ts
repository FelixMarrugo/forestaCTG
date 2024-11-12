import { Component } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './../menu/menu.component';
import {FooterComponent} from './../footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule, MenuComponent, FooterComponent, RouterModule],
})
export class LayoutComponent {
  constructor() {}
}

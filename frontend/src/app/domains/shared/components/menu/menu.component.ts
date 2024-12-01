import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor() { }

}

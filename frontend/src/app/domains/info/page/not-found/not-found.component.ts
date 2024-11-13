import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-not-found',
  standalone:true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],

})
export class NotFoundComponent {

  constructor() {}

}

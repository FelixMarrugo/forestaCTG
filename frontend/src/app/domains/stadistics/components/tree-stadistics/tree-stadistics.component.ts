import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-stadistics',
  standalone:true,
  imports:[IonicModule, CommonModule],
  templateUrl: './tree-stadistics.component.html',
  styleUrls: ['./tree-stadistics.component.scss'],
})
export class TreeStadisticsComponent{
  constructor() { }

  @Input() countTree!: number;

}

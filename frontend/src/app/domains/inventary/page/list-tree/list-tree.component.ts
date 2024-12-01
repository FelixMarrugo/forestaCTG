import { Component, inject, signal } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-list-tree',
  standalone: true,
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.scss'],
  imports: [
    ListTreeComponent,
    TableComponent,
    FilterComponent,
    SearchComponent,
    IonicModule,
    CommonModule,
  ],
})
export class ListTreeComponent {



  constructor() {}


}

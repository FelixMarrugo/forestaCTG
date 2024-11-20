import { Component, inject, OnInit, signal } from '@angular/core';
import { TreeService } from '../../services/tree.service';
import { Tree } from '../../models/tree.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [IonicModule, CommonModule, RouterLinkWithHref],
})
export class TableComponent  implements OnInit {

  constructor() {}

  trees = signal<Tree[]>([]);
  private treeService = inject(TreeService);
  ngOnInit() {
    this.treeService.getTrees().subscribe({
      next: (response) => {
        console.log('fetching trees: ', response);
        this.trees.set(response);
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }
}

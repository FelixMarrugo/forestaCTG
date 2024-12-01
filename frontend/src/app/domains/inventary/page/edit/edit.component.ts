import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { FormTreeComponent } from '../../components/form-tree/form-tree.component';
import { Tree, UpdateTreeDTO } from '../../models/tree.model';
import { TreeService } from '../../services/tree.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [FormTreeComponent, IonicModule, CommonModule, ReactiveFormsModule],
})
export class EditComponent implements OnInit {
updateTree() {
throw new Error('Method not implemented.');
}
  title = 'EDIT TREE';
  treeId: string = '';
  tree: any;
  description = 'Llene los campos que desea modificar';
  private treeService = inject(TreeService);
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.treeId = this.route.snapshot.paramMap.get('id') ?? ''; // Now you can use treeId for your request and edit the tree//+{"conversationId":"30e4fc25-5526-4d9c-97b1-b5f800250085","source":"instruct"}
    console.log(this.treeId);
    this.getTreeId();
  }

  getTreeId() {
    console.log(this.tree);
    this.treeService.getOne(this.treeId).subscribe({
      next: (response) => {
        console.log('Tree: ', response);
        this.tree = response;
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      }, // End of subscribe block
    });
  }
}

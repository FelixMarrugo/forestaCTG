import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeService } from '../../services/tree.service';
import { CreateTreeDTO } from '../../models/tree.model';
import { FormTreeComponent } from '../../components/form-tree/form-tree.component';
@Component({
  selector: 'app-add-tree',
  standalone: true,
  templateUrl: './add-tree.component.html',
  styleUrls: ['./add-tree.component.scss'],
  imports: [IonicModule, CommonModule, FormTreeComponent],
})
export class AddTreeComponent {
  private treeService = inject(TreeService);

  constructor() {}

  createNewTree(tree: CreateTreeDTO) {
    this.treeService.create(tree).subscribe((response) => {
      console.log('Created: ', response);
    });
  }
}

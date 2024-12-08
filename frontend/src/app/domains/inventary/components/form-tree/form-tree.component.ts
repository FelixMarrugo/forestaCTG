import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CreateTreeDTO, Tree } from '../../models/tree.model';

@Component({
  selector: 'app-form-tree',
  standalone: true,
  templateUrl: './form-tree.component.html',
  styleUrls: ['./form-tree.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class FormTreeComponent implements OnInit, OnChanges {
  @Input() tree!: Tree;
  @Input() title!: string;
  @Input() description!: string;
  @Input() editTree!: Tree;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  addTree = new FormGroup({
    location: new FormControl(''),
    commonName: new FormControl(''),
    scientificName: new FormControl(''),
    neighborhood: new FormControl(''),
    locality: new FormControl('1'),
    physicalDescription: new FormControl(''),
    photo: new FormControl(''),
    state: new FormControl('true'),
  });

  constructor() {}

  ngOnInit() {
    if (this.editTree) {
      this.addTree.patchValue(this.editTree);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTree'] && this.addTree) {
      this.addTree.patchValue(this.editTree);
    }
  }

  createNewTree() {
    const tree: CreateTreeDTO = {
      location: this.addTree.value.location ?? '',
      commonName: this.addTree.value.commonName ?? '',
      scientificName: this.addTree.value.scientificName ?? '',
      neighborhood: this.addTree.value.neighborhood ?? '',
      locality: this.addTree.value.locality ?? '',
      physicalDescription: this.addTree.value.physicalDescription ?? '',
      photo: this.addTree.value.photo ?? '',
      state: this.addTree.value.state ?? '',
    };
    this.add.emit(tree);
    this.addTree.reset();
  }

  updateTree() {
    const tree: CreateTreeDTO = {
      location: this.addTree.value.location ?? '',
      commonName: this.addTree.value.commonName ?? '',
      scientificName: this.addTree.value.scientificName ?? '',
      neighborhood: this.addTree.value.neighborhood ?? '',
      locality: this.addTree.value.locality ?? '',
      physicalDescription: this.addTree.value.physicalDescription ?? '',
      photo: this.addTree.value.photo ?? '',
      state: this.addTree.value.state ?? '',
    };
    this.edit.emit(tree);
  }
}

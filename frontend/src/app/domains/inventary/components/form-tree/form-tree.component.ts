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
    locality: new FormControl(''),
    physicalDescription: new FormControl(''),
    photo: new FormControl(''), // Aquí puede ser string o File
    state: new FormControl(true), // Cambiado a boolean
  });

  selectedFile: File | string = '';

  constructor() {}

  ngOnInit() {
    if (this.editTree) {
      this.addTree.patchValue(this.editTree);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTree'] && this.addTree) {
      // Convertir el archivo a string para compatibilidad
      if (this.editTree.photo) {
        this.addTree.patchValue({
          ...this.editTree,
          photo: typeof this.editTree.photo === 'string' ? this.editTree.photo : ''
        });
      } else {
        this.addTree.patchValue(this.editTree);
      }
      // Asegurar que el estado es booleano
      this.addTree.patchValue({
        ...this.editTree,
        state: this.editTree.state
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createNewTree() {
    const tree: CreateTreeDTO = {
      location: this.addTree.value.location ?? '',
      commonName: this.addTree.value.commonName ?? '',
      scientificName: this.addTree.value.scientificName ?? '',
      neighborhood: this.addTree.value.neighborhood ?? '',
      locality: this.addTree.value.locality ?? '',
      physicalDescription: this.addTree.value.physicalDescription ?? '',
      photo: this.selectedFile, // Se envía el archivo en lugar de la URL
      state: this.addTree.value.state ?? true, // Asegúrate de que es boolean
    };
    console.log('createNewTree: ', tree); // Log para verificación
    this.add.emit(tree);
    this.addTree.reset();
  }
}

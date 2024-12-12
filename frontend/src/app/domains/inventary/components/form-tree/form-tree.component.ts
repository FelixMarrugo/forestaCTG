import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  Inject,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CreateTreeDTO, Tree } from '../../models/tree.model';
import { LbService } from 'src/app/domains/shared/services/lb.service';

@Component({
  selector: 'app-form-tree',
  standalone: true,
  templateUrl: './form-tree.component.html',
  styleUrls: ['./form-tree.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class FormTreeComponent implements OnInit, OnChanges {
  private lbService = inject(LbService);

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
    photo: new FormControl(''),
    state: new FormControl('true'),
  });

  constructor() {
    this.setBarrios();
    console.log('Barrios: ',this.barrios);
  }


  barrios:string[] = [];
  LB = this.lbService.lb();

    setBarrios() {
      this.barrios = (this.lbService.setBarrios());
    }



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

  localidad: string = '';
  SetLocality(event: Event): void {
    console.log('Event: ', event);
    console.log('barrio: addtree: ', this.addTree.value.locality);
    const barrioIndicado = (event.target as HTMLInputElement).value;
    console.log('barrioIndicado: ', barrioIndicado);
    for (let [localidad, barrios] of this.LB) {
      if (barrios.includes(barrioIndicado)) {
        console.log('La localidad es', localidad);
        this.localidad = localidad as string;
        this.addTree.controls['locality'].setValue(localidad.toString());
        break;
      } else {
        console.log('Barrio no encontrado.');
        this.localidad = '';
      }
    }
  }
}

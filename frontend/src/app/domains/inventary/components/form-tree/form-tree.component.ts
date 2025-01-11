import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CreateTreeDTO, Tree, UpdateTreeDTO } from '../../models/tree.model';
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
  file!: File;
  filename!: string;
  archivoBase64!: string | ArrayBuffer | null;
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
    state: new FormControl(true),
  });

  constructor(private fb: FormBuilder) {
    this.setBarrios();
    console.log('Barrios: ', this.barrios);
  }
  handlerFile(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.filename = file.name;
      if (file) {
        // const archivoSeleccionado = file;
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.archivoBase64 = base64String?.split(',')[1];
          console.log('Archivo convertido a base64:', this.archivoBase64);
        };
        reader.readAsDataURL(file);
        console.log('Target: ', file)
      }
    }
  }

  barrios: string[] = [];
  LB = this.lbService.lb();

  setBarrios() {
    this.barrios = this.lbService.setBarrios();
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
      img: this.archivoBase64,
      imgName:  this.filename,
      state: this.addTree.value.state //true ? this.addTree.value.state == 'true' : false,
    };
    this.add.emit(tree);
    this.addTree.reset();

    console.log('Tree a crear: ', tree);
  }

  updateTree() {
    const tree: UpdateTreeDTO = {
      location: this.addTree.value.location ?? '',
      commonName: this.addTree.value.commonName ?? '',
      scientificName: this.addTree.value.scientificName ?? '',
      neighborhood: this.addTree.value.neighborhood ?? '',
      locality: this.addTree.value.locality ?? '',
      physicalDescription: this.addTree.value.physicalDescription ?? '',
      //photo: this.addTree.value.photo ?? '',
      state: this.addTree.value.state,
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

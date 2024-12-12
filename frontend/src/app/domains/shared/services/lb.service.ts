import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LbService {

  constructor() { }
  LB =[
    [
      'Localidad Histórica y del Caribe Norte',
      [
        'Bocagrande',
        'Castillo Grande',
        'El Laguito',
        'Getsemaní',
        'Manga',
        'Pie de la Popa',
        'Centro',
        'San Diego',
        'La Matuna',
      ],
    ],
    [
      'Localidad de la Virgen y Turística',
      [
        'El Pozón',
        'Chiquinquirá',
        'Olaya Herrera',
        'Nelson Mandela',
        'La Consolata',
        'Boston',
        'Tesca',
        'Blas de Lezo',
        'El Campestre',
        'Urbanización El Country',
      ],
    ],
    [
      'Localidad Industrial y de la Bahía',
      [
        'Almirante Colón',
        'Santa María',
        'Zaragocilla',
        'El Carmen',
        'El Carmelo',
        'Santa Mónica',
        'Los Calamares',
        'El Líbano',
        'La Esperanza',
        'La Victoria',
      ],
    ],
  ];

  barrios:string[] = [];
  setBarrios() {
    this.LB.forEach((localidadArr) => {
      const [localidad, barrios] = localidadArr;
      if (Array.isArray(barrios)) {
        barrios.forEach((barrio: string) => this.barrios.push(barrio));
      } else {
        console.error('Barrios is not an array:', barrios);
      }
    });
    return this.barrios;
  }

  lb(){
    return this.LB;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Maintenance } from 'src/app/domains/maintenance/models/maintenance.model';

@Component({
  selector: 'app-maintenance-staditics',
  standalone: true,
  imports: [IonicModule, CommonModule, NgChartsModule],
  templateUrl: './maintenance-staditics.component.html',
  styleUrls: ['./maintenance-staditics.component.scss'],
})
export class MaintenanceStaditicsComponent implements AfterViewInit {
  constructor() {}
  @Input() maintenanceArray!: Maintenance[];
  arrayBarrios!: any[];
  countMaintenance!:number;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maintenanceForNeighborhood();
    }, 1000);
  }

  maintenanceForNeighborhood(): void {
    let barriosAux: { [key: string]: number } = {};

    this.maintenanceArray.forEach((maintenance) => {
      if (barriosAux[maintenance.neighborhood]) {
        barriosAux[maintenance.neighborhood]++;
      } else {
        barriosAux[maintenance.neighborhood] = 1;
      }
    });

    this.arrayBarrios = Object.entries(barriosAux);
    console.log('MaintenanceForTree: [', this.arrayBarrios, ']');
    this.grafica();
  }

  title = 'Estadísticas de Árboles por Localidad';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: this.title },
    },
  };

  grafica() {
    console.log('Grafica');

    let labels = this.arrayBarrios.map((item) => item[0]);
    let data = this.arrayBarrios.map((item) => item[1]);
    this.countMaintenance = data.reduce((acc, item) => acc +item);
    let backgroundColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(201, 203, 207, 0.5)',
      'rgba(255, 99, 71, 0.5)',
      'rgba(144, 238, 144, 0.5)',
      'rgba(0, 191, 255, 0.5)',
    ];
    console.log('data', data);
    console.log('labels', labels);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Mantenimientos por localidad',
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          hoverBackgroundColor: backgroundColors
            .map((color) => color.replace('0.5', '1.0'))
            .slice(0, data.length),
          hoverBorderColor: backgroundColors
            .map((color) => color.replace('0.5', '1.0'))
            .slice(0, data.length),
          borderWidth: 1,
        },
      ],
    };
  }
}

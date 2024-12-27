import { Component, inject, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { LbService } from 'src/app/domains/shared/services/lb.service';
@Component({
  selector: 'app-tree-stadistics',
  standalone: true,
  imports: [IonicModule, CommonModule, NgChartsModule],
  templateUrl: './tree-stadistics.component.html',
  styleUrls: ['./tree-stadistics.component.scss'],
})
export class TreeStadisticsComponent implements AfterViewInit {
  @Input() treeXlocality: number[] = [];
  @Input() loc_1!: number;
  private lbService = inject(LbService);
  title = 'ng2-charts-demo';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Estadísticas de Árboles por Localidad' },
    },
  };
  constructor() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.barChartData = {
        labels: ['Arboles por localidad'],
        datasets: [
          {
            data: [this.treeXlocality[0]],
            label: this.lbService.LB[0][0] as string,
            backgroundColor: ['rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 0.5)'],
            hoverBackgroundColor: ['rgba(255, 99, 132)'],
            hoverBorderColor: ['rgba(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            data: [this.treeXlocality[1]],
            label: this.lbService.LB[1][0] as string,
            backgroundColor: ['rgba(255, 205, 86, 0.5)'],
            borderColor: ['rgba(255, 205, 86, 0.5)'],
            hoverBackgroundColor: ['rgba(255, 205, 86)'],
            hoverBorderColor: ['rgba(255, 205, 86)'],
            borderWidth: 1,
          },
          {
            data: [this.treeXlocality[2]],
            label: this.lbService.LB[2][0] as string,
            backgroundColor: ['rgba(153, 102, 255, 0.5)'],
            borderColor: ['rgba(153, 102, 255, 0.5)'],
            hoverBackgroundColor: ['rgba(153, 102, 255)'],
            hoverBorderColor: ['rgba(153, 102, 255)'],
            borderWidth: 1,
          },
        ],
      };
      console.log('treeXlocality: ', this.treeXlocality);
    }, 1000);
  }
  counTree() {
    return this.treeXlocality.reduce((a, b) => a + b);
  }
}

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
            backgroundColor: ['#2088E3'],
            borderColor: ['#2088E3'],
            borderWidth: 1,
          },
          {
            data: [this.treeXlocality[1]],
            label: this.lbService.LB[1][0] as string,
            backgroundColor: ['#20E37E'],
            borderColor: ['#20E37E'],
            borderWidth: 1,
          },
          {
            data: [this.treeXlocality[2]],
            label: this.lbService.LB[2][0] as string,
            backgroundColor: ['#20C5E3'],
            borderColor: ['#20C5E3'],
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

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TreeService } from 'src/app/domains/inventary/services/tree.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenance } from '../../models/maintenance.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detail-maintenance',
  standalone: true,
  imports: [CommonModule, IonicModule], // Add any required modules here.
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['./detail-maintenance.component.scss'],
})
export class DetailMaintenanceComponent implements OnInit {
  private treeService = inject(TreeService);
  private maintenanceService = inject(MaintenanceService);

  id!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  maintenance = signal<Maintenance | null>(null);
  get() {
    this.maintenanceService.getOne(this.id).subscribe({
      next: (response) => {
        console.log('fetching trees: ', response);
        this.maintenance.set(response);
        this.getFilterNeiborhood();
      },
      error: (error) => {
        console.error('Error fetching trees:', error);
      },
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? ''; // Now you can use treeId for your request and edit the tree//
    +{
      conversationId: '30e4fc25-5526-4d9c-97b1-b5f800250085',
      source: 'instruct',
    };
    console.log(this.id);
    this.get();

  }
  getFilterNeiborhood() {
    console.log('neighborhood: ', this.maintenance()!.neighborhood);
    this.maintenanceService.getFilterNeiborhood(this.maintenance()!.neighborhood)
      .subscribe({
        next: async (response) => {
          console.log('Filtro: ', response);
        },
        error: async (error) => {
          console.error('Error creating: ', error);
        },
      });
  }
}

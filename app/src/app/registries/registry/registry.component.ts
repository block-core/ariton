import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistryService } from '../../registry.service';
import { MatTabsModule } from '@angular/material/tabs';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    DatePipe,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
  ],
})
export class RegistryComponent implements AfterViewInit {
  registryService = inject(RegistryService);

  constructor() {}

  ngAfterViewInit(): void {}

  async ngOnInit() {}
}

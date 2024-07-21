import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
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
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

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
    MatChipsModule,
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
    FormsModule,
  ],
})
export class RegistryComponent implements AfterViewInit {
  registryService = inject(RegistryService);

  // selectedTags = signal<string[]>([]);

  selectedTags: string[] = [];

  constructor() {}

  ngAfterViewInit(): void {}

  async ngOnInit() {}

  onSelectionChange(event: any) {
    this.registryService.filter(this.selectedTags);
    console.log('Selection changed:', event);
    console.log(this.selectedTags);
    // Handle the selection change event
  }
}

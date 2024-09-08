import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject, model, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../../layout.service';

type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  id?: string;
};

@Component({
  selector: 'app-local-company',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './local-company-view.component.html',
  styleUrl: './local-company-view.component.scss',
})
export class LocalCompanyViewComponent {
  layout = inject(LayoutService);

  ngOnInit() {
    this.layout.marginOn();
    this.layout.enableNavigation();
  }
}

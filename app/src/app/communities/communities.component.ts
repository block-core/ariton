import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  effect,
  model,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TableDataSource, TableItem } from './communities-datasource';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-communities',
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
  ],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CommunitiesComponent {
  search = new FormControl('');
  // view = new FormControl('card');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new TableDataSource();

  // hideSingleSelectionIndicator = signal(false);
  // toggle() {
  //   // While standard inputs are read-only, you can write directly to model inputs.
  //   if (this.viewStyle() === 'card') {
  //     this.viewStyle.set('table');
  //   } else {
  //     this.viewStyle.set('card');
  //   }
  // }

  // Function to handle page changes (optional)
  // onViewChange(style: string) {
  //   // Perform any logic based on the new page value
  //   this.viewStyle.set(style); // Update the model signal
  // }

  // toggleSingleSelectionIndicator() {
  //   this.hideSingleSelectionIndicator.update((value) => !value);

  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;

  //   console.log('HI!');
  // }

  //viewStyle = signal('card');
  viewStyle = model<string>('card');

  checked = model<boolean>(false);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private router: Router) {
    // Register a new effect.
    effect(() => {
      console.log(`The view style is: ${this.viewStyle()})`);

      setTimeout(() => {
        if (this.table) {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }
      });
    });

    effect(() => {
      console.log(`The checked is: ${this.checked()})`);
    });

    console.log('HI!');
  }

  open(community: string) {
    this.router.navigate(['community', community]);
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}

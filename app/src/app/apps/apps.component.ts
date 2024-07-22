import { ChangeDetectionStrategy, Component, ViewChild, effect, inject, model, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TableDataSource, TableItem } from './apps-datasource';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
};

@Component({
  selector: 'app-apps',
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
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppsComponent {
  search = new FormControl('');
  // view = new FormControl('card');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new TableDataSource();

  cards = signal<CardContent[]>([]);

  images = ['nature', 'sky', 'grass', 'mountains', 'rivers', 'glacier', 'forest', 'streams', 'rain', 'clouds'];

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

    const cards: CardContent[] = [];
    for (let i = 0; i < this.images.length; i++) {
      cards.push({
        title: `App ${i + 1}`,
        description: `This is a description of app. Add this app to your community.`,
        imageUrl: `https://picsum.photos/seed/${this.images[i]}x/200/300`,
      });
    }

    this.cards.set(cards);
  }

  open(community: string) {
    this.router.navigate(['community', community]);
  }

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cardsHighlighted = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Friends', cols: 1, rows: 1, description: 'Connect with your friends and connections.' },
          { title: 'Chat', cols: 1, rows: 1, description: 'Chat with your friends or community groups' },
          { title: 'File Sharing', cols: 1, rows: 1, description: 'Share files with friends and communities.' },
          { title: 'Tasks', cols: 1, rows: 1, description: 'Manage tasks, either alone or with friends or communities.' },
        ];
      }

      return [
        { title: 'Friends', cols: 2, rows: 1, description: 'Connect with your friends and connections.' },
        { title: 'Chat', cols: 1, rows: 1, description: 'Chat with your friends or community groups' },
        { title: 'File Sharing', cols: 1, rows: 2, description: 'Share files with friends and communities.' },
        { title: 'Tasks', cols: 1, rows: 1, description: 'Manage tasks, either alone or with friends or communities.' },
      ];
    }),
  );

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}

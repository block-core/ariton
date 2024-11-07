import { ChangeDetectionStrategy, Component, ViewChild, effect, inject, model, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Community, TableDataSource } from './communities-datasource';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppService } from '../app.service';
import { LayoutService } from '../layout.service';
import { DataService } from '../data.service';
import { RecordEntry } from '../data';

type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
};

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [
    RouterModule,
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
  // @ViewChild(MatTable) table!: MatTable<any>;
  dataSource!: TableDataSource; // = new TableDataSource();
  // dataSource: MatTableDataSource<UserData>;

  // cards = signal<Community[]>([]);

  app = inject(AppService);

  layout = inject(LayoutService);

  images = ['nature', 'sky', 'grass', 'mountains', 'rivers', 'glacier', 'forest'];

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
  viewStyle = model<string>('thumbnail');

  checked = model<boolean>(false);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description'];

  data = inject(DataService);

  constructor(private router: Router) {
    // this.dataSource.data = [];

    this.layout.marginOn();

    // Register a new effect.
    // effect(() => {
    //   if (this.viewStyle() === 'table') {
    //     setTimeout(() => {
    //       // this.dataSource.sort = this.sort;
    //       // this.dataSource.paginator = this.paginator;
    //       // this.table.dataSource = this.cards();

    //       console.log('DATA SOURCE SEt ON TABLE!!!');

    //       // this.table.dataSource = this.dataSource;
    //     });
    //   }
    // });

    effect(() => {
      const currentView = this.viewStyle();
      console.log(`View style changed to: ${currentView}`);

      if (currentView === 'table') {
        console.log('DATA SOURCE: ', this.dataSource);
        // console.log('TABLE: ', this.table);
        // this.table.dataSource = this.communities();
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.table.dataSource = this.dataSource;
      }
    });

    // Register a new effect.
    effect(async () => {
      if (this.app.initialized()) {
        // setTimeout(() => {
        //   if (this.table) {
        //     this.dataSource.sort = this.sort;
        //     this.dataSource.paginator = this.paginator;
        //     this.table.dataSource = this.dataSource;
        //   }
        // });

        // await this.loadCommunities();
        await this.loadDrafts();

        this.dataSource = new TableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Just set a timeout to load drafts, as the last save might not have been processed yet.
        // setTimeout(() => {
        //   this.loadDrafts();
        // }, 300);
      }
    });

    const cards: Community[] = [];

    for (let i = 0; i < this.images.length; i++) {
      cards.push({
        id: 'id' + 1,
        name: `Community ${i + 1}`,
        description: `This is a description of community. We are a great community with many members.`,
        thumbnail: `https://picsum.photos/seed/${this.images[i]}x/200/300`,
        private: false,
        visibility: 'public',
        type: 'generic',
        features: {
          discussion: true,
          members: true,
          events: true,
          media: true,
          files: true,
        },
        apps: ['events', 'media', 'files'],
      });
    }

    cards.push({
      id: 'id' + 1,
      name: `Craft Knitting`,
      description: `Join the craft knitting community to share amazing patterns and socialize with other knitters.`,
      thumbnail: `https://www.studioknitsf.com/wp-content/uploads/2021/02/thumbnails-pattern-book-2021.jpg.webp`,
      private: false,
      visibility: 'public',
      type: 'generic',
      features: {
        discussion: true,
        members: true,
        events: true,
        media: true,
        files: true,
      },
      apps: ['events', 'media', 'files'],
    });

    cards.push({
      id: 'id' + 1,
      name: `Montenegro Liberterian Festival 2024`,
      description: `Join the MTLFest 2024 community group.`,
      thumbnail: `https://optim.tildacdn.one/tild3333-6237-4666-b532-336530656464/-/resize/600x/-/format/webp/FMF_Yellow_Circle.png`,
      private: false,
      visibility: 'public',
      type: 'generic',
      features: {
        discussion: true,
        members: true,
        events: true,
        media: true,
        files: true,
      },
      apps: ['events', 'media', 'files'],
    });

    cards.push({
      id: 'id' + 1,
      name: `Montelibero`,
      description: `Free Society Project Europe.`,
      thumbnail: `https://montelibero.org/wp-content/uploads/2023/04/fspe_logo_3-05-200.png`,
      private: false,
      visibility: 'public',
      type: 'generic',
      features: {
        discussion: true,
        members: true,
        events: true,
        media: true,
        files: true,
      },
      apps: ['events', 'media', 'files'],
    });

    cards.push({
      id: 'id' + 1,
      name: `Liberstad`,
      description: `The Free City of Liberstad`,
      thumbnail: `https://free-communities.org/wp-content/uploads/2023/10/liberstad-flag-10.23.webp`,
      private: false,
      visibility: 'public',
      type: 'generic',
      features: {
        discussion: true,
        members: true,
        events: true,
        media: true,
        files: true,
      },
      apps: ['events', 'media', 'files'],
    });

    // this.cards.set(cards);

    // this.dataSource.data = cards;
  }

  open(community: string) {
    this.router.navigate(['/community', community]);
  }

  join(community: string) {
    this.router.navigate(['/community', community], { queryParams: { join: true } });
  }

  ngOnInit() {
    this.layout.resetActions();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.table.dataSource = this.dataSource;
    // const dataSource = new MatTableDataSource([]);
    // dataSource.paginator = this.paginator;
    // dataSource.sort = this.sort;
    // this.dataSource = dataSource;
  }

  drafts = signal<any[]>([]);

  communities = signal<RecordEntry<any>[]>([]);

  async loadDrafts() {
    // TODO: Load drafts and then reload on subscribe, because we save on exit and that is async operation
    // that will not funish until after next page is loaded.
    const entries = await this.data.load({ type: 'community', status: 'draft' });
    this.drafts.set(entries);
  }

  async loadCommunities() {
    const entries = await this.data.load({ type: 'community', status: 'active' });
    this.communities.set(entries);

    // this.dataSource.data = entries;

    // setTimeout(() => {
    //   console.log('SETTING TABLE:', this.dataSource, this.paginator, this.table);
    //   if (this.table) {
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     this.table.dataSource = this.dataSource;

    //     console.log('SETTING TABLE:', this.dataSource, this.paginator, this.table);
    //   }
    // });
  }

  async createTest() {
    const tags = {
      type: 'community',
      status: 'draft',
    };

    const record = await this.data.save({ name: 'Test Community', description: 'This is a test community.' }, tags);

    console.log('Community Data Record:', record);

    // const records = await this.data.load(tags);
    // console.log('Community Data Records:', records);
    // const r1 = records[0];

    await this.data.update(
      record.record,
      { name: 'Test Community 2', description: 'This is a test community 2.' },
      tags,
    );

    const records = await this.data.load(tags);
    console.log('Community Data Records:', records);

    // for (const r of records) {
    //   console.log('Community Data Record:', r);
    //   await this.data.delete(r.id);
    // }
  }
}

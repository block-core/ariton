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
// import { TableDataSource, TableItem } from './apps-datasource';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { LayoutService } from '../layout.service';

type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
  id?: string;
};

@Component({
    selector: 'app-apps',
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
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppsComponent {
  search = new FormControl('');
  // view = new FormControl('card');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CardContent>;
  // dataSource = new TableDataSource();
  cards = signal<CardContent[]>([]);

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

  layout = inject(LayoutService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['imageUrl', 'title', 'description'];

  constructor(private router: Router) {
    this.layout.marginOn();

    // Register a new effect.
    effect(() => {
      if (this.viewStyle() === 'table') {
        setTimeout(() => {
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.cards();

          console.log('DATA SOURCE SEt ON TABLE!!!');

          // this.table.dataSource = this.dataSource;
        });
      }
    });

    effect(() => {
      console.log(`The checked is: ${this.checked()})`);
    });
  }

  open(community: string) {
    this.router.navigate(['community', community]);
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;

    const cards: CardContent[] = [];

    // The "id" of apps should be unique and should not be a number, maybe a hash or potentially
    // mapped to a DID?

    cards.push({
      title: 'Chat',
      id: 'chat',
      description: 'Send private messages to other users.',
      imageUrl: '/icons/apps/chat.jpg',
    });

    cards.push({
      title: 'Files',
      id: 'files',
      description: 'Upload and share files stored on your DWeb node.',
      imageUrl: '/icons/apps/files.jpg',
    });

    cards.push({
      title: 'Notes',
      id: 'notes',
      description: 'Manage your private and shared notes.',
      imageUrl: '/icons/apps/notes.jpg',
    });

    cards.push({
      title: 'Tasks',
      id: 'tasks',
      description: 'Manage your private and shared tasks.',
      imageUrl: '/icons/apps/tasks.jpg',
    });

    cards.push({
      title: 'Text',
      id: 'text',
      description: 'Keep your inspiration going with this text editor. Use it to write and share your thoughts.',
      imageUrl: '/icons/apps/text.jpg',
    });

    cards.push({
      title: 'Issuer',
      id: 'issuer',
      description: 'Generic Credential Issuer app.',
      imageUrl: '/icons/apps/issuer.webp',
    });

    cards.push({
      title: 'Voluntaryist Covenant',
      id: 'voluntaryist-covenant',
      description:
        'The covenant is based on the natural rights of self-ownership, non-aggression, and property rights. Use this app to sign the covenant and store the credential.',
      imageUrl:
        'https://static.wixstatic.com/media/b8788b_e8db1fae306c4f4d95423ae5861f8fb3~mv2.png/v1/fill/w_128,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/World_Voluntaryist_Organisation-removebg-preview.png',
    });

    cards.push({
      title: 'Player',
      id: 'player',
      description: 'Player for listening to music, watching videos and podcasts.',
      imageUrl: '/icons/apps/player.jpg',
    });

    cards.push({
      title: 'Known Customer Credential',
      id: 'kcc',
      description:
        'Allows issuance of Known Customer Credential (KCC) to users that includes evidence from their KYC verification.',
      imageUrl: '/icons/apps/kcc.webp',
    });

    // for (let i = 0; i < this.images.length; i++) {
    //   cards.push({
    //     title: `App ${i + 1}`,
    //     // id: `${i + 1}`,
    //     description: `This is a description of app. Add this app to your community.`,
    //     imageUrl: `https://picsum.photos/seed/${this.images[i]}x/200/300`,
    //   });
    // }

    this.cards.set(cards);

    // this.table.dataSource = this.cards();
  }
}

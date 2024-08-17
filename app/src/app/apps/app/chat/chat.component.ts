import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../../layout.service';
import { OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface Section {
  id: string;
  name: string;
  updated: Date;
  message: string;
  avatar: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    DatePipe,
    AgoPipe,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnDestroy {
  viewStyle = model<string>('card');

  layout = inject(LayoutService);

  details = signal<boolean>(true);

  detailsBig = signal<boolean>(false);

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    const customBreakpoint = '(max-width: 1024px)';

    // Observe the custom breakpoint
    this.breakpointObserver.observe([customBreakpoint]).subscribe((result) => {
      console.log('MATCHES:', result.matches);
      if (result.matches) {
        // Code to execute when the viewport is 959.98px or less
        this.details.set(false);
        this.detailsBig.set(true);
      } else {
        // Code to execute when the viewport is greater than 959.98px
        //  this.small.set(false);
        this.detailsBig.set(false);
      }
    });
  }

  ngOnInit() {
    this.layout.disableScrolling();
    this.layout.resetActions();
    this.layout.marginOff();
  }

  ngOnDestroy() {
    this.layout.enableScrolling();
  }

  chat = signal<any>(null);

  toggleDetails() {
    this.details.set(!this.details());
  }

  closeDetails() {
    this.details.set(false);
  }

  open(id: string) {
    const chat = this.folders.find((f) => f.id === id);
    this.chat.set(chat);
  }

  folders: Section[] = [
    {
      id: '1',
      name: 'Sondre',
      message: 'Hey, how are you?',
      updated: new Date('1/1/24'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
    {
      id: '2',
      name: 'Dan',
      message: 'Do you have the reports?',
      updated: new Date('1/17/16'),
      avatar: 'https://ariton.app/assets/dan.png',
    },
    {
      id: '3',
      name: 'Joe',
      message: 'I need help with the project',
      updated: new Date('1/28/16'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
  ];
  notes: Section[] = [
    {
      id: '4',
      name: 'Luba',
      message: 'I need to plan my vacation',
      updated: new Date('2/20/16'),
      avatar: 'https://ariton.app/assets/lu.jpg',
    },
    {
      id: '5',
      name: 'Jane',
      message: 'I need to remodel my kitchen',
      updated: new Date('1/18/16'),
      avatar: 'https://ariton.app/assets/sondre.png',
    },
  ];
}

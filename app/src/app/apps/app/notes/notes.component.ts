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
import { DatePipe } from '@angular/common';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteDialogComponent } from './note-dialog.component';

export interface Section {
  id: string;
  name: string;
  updated: Date;
  message: string;
  avatar: string;
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
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
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnDestroy {
  viewStyle = model<string>('card');

  selectedTags: string[] = [];

  dialog = inject(MatDialog);

  public layout = inject(LayoutService);

  labels = signal<string[]>(['Reminders', 'Inspiration', 'Personal', 'Work']);

  constructor() {
    this.layout.disableScrolling();
    this.layout.addAction({ name: 'New Note', icon: 'note_add', action: () => {} });
  }

  onSelectionChange(event: any) {
    // this.registryService.filter(this.selectedTags);

    console.log('Selection changed:', event);
    console.log(this.selectedTags);
    // Handle the selection change event
  }

  ngOnDestroy() {
    this.layout.enableScrolling();
  }

  chat = signal<any>(null);

  open(id: string) {
    const chat = this.folders.find((f) => f.id === id);
    this.chat.set(chat);
  }

  editNote(recordId: string) {
    let data = {
      title: '123',
      body: '222',
      background: 'red',
      collaborators: ['12', '33333'],
    };

    const original = JSON.parse(JSON.stringify(data));

    const dialogRef = this.dialog.open(NoteDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        // Reset the original data if user cancels.
        data = original;
      }

      console.log('data result:', data);
    });

    return dialogRef.afterClosed();
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

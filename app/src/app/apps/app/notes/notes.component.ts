import { Component, effect, inject, model, signal } from '@angular/core';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogData, NoteDialogComponent } from './note-dialog.component';
import { protocolDefinition as noteDefinition } from '../../../../protocols/note';
import { IdentityService } from '../../../identity.service';
import { AppService } from '../../../app.service';

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
    CommonModule,
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

  identity = inject(IdentityService);

  app = inject(AppService);

  labels = signal<string[]>(['Reminders', 'Inspiration', 'Personal', 'Work']);

  records = signal<any[]>([]);

  constructor() {
    // this.layout.disableScrolling();
    this.layout.addAction({ name: 'New Note', icon: 'note_add', action: () => {} });

    effect(async () => {
      if (this.app.initialized()) {
        await this.loadNotes();
      }
    });
  }

  async deleteNote(entry: any) {
    const { status } = await entry.record.delete();

    if (status) {
      this.records.update((records) => records.filter((r) => r.record != entry.record));
    }
  }

  async loadNotes() {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: noteDefinition.protocol,
          schema: noteDefinition.types.note.schema,
          dataFormat: noteDefinition.types.note.dataFormats[0],
        },
      },
    });

    //     let json = {};
    // let recordEntry = null;

    this.records.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.records.update((records) => [...records, json]);
        console.log('All requests:', this.records());
      }
    }
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

  editNote(entry: any) {
    let data: DialogData = {
      title: entry.data.title,
      body: entry.data.body,
      background: entry.data.background,
      collaborators: ['12', '33333'],
      labels: ['label2', 'label3'],
    };

    const original = JSON.parse(JSON.stringify(data));

    const dialogRef = this.dialog.open(NoteDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        // Reset the original data if user cancels.
        data = original;
      } else {
        console.log('data result for saving:', data);
        await this.saveNote(entry, data);

        // Update the data so it's displayed in the UI without re-query DWN.
        this.records().find((r) => r.record == entry.record).data = data;
      }
    });

    return dialogRef.afterClosed();
  }

  ngOnInit() {}

  selectColor() {}

  async onColorChange(event: Event, entry: any) {
    // Get the new input value
    const newValue = (event.target as HTMLInputElement).value;
    // Perform actions based on the new value
    console.log('Input value changed:', newValue);

    entry.data.background = newValue;

    const { status, record } = await entry.record.update({
      data: entry.data,
    });

    console.log('Record created:', record);
    console.log('Record status:', status);
  }

  async saveNote(entry: any, data: DialogData) {
    if (entry.record) {
      const { status, record } = await entry.record.update({
        data: data,
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      if (record) {
        //send record to recipient's DWN
        // const { status } = await record.send(recipient);
        // console.log('Record sent:', status, record);
        // Show a toast notification
        // this.snackBar.open('Record sent successfully!', 'Close', {
        //   duration: 3000, // Duration in milliseconds
        // });
      }
    } else {
      const { record, status } = await this.identity.web5.dwn.records.create({
        data: data,
        message: {
          tags: {
            label2: 'inspiration',
            label3: 'personal',
          },
          protocol: noteDefinition.protocol,
          protocolPath: 'note',
          schema: noteDefinition.types.note.schema,
          dataFormat: noteDefinition.types.note.dataFormats[0],
        },
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      if (record) {
        //send record to recipient's DWN
        // const { status } = await record.send(recipient);
        // console.log('Record sent:', status, record);
        // Show a toast notification
        // this.snackBar.open('Record sent successfully!', 'Close', {
        //   duration: 3000, // Duration in milliseconds
        // });
      }
    }
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

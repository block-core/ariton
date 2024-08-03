import { Component, effect, inject, model, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../../layout.service';
import { OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogData, NoteDialogComponent } from './note-dialog.component';
import { protocolDefinition as noteDefinition } from '../../../../protocols/note';
import { IdentityService } from '../../../identity.service';
import { AppService } from '../../../app.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';

import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
  CdkMenuModule,
} from '@angular/cdk/menu';

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
    MatSelectModule,
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
    OverlayModule,
    CdkMenuModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnDestroy {
  @ViewChild('matMenuTrigger', { read: MatMenuTrigger })
  private matMenuTriggerRef!: MatMenuTrigger;
  @ViewChild('matMenuTrigger', { read: MatButton })
  private matButtonRef!: MatButton;
  @ViewChildren('menuItems')
  private menuItemsRef!: QueryList<MatCheckbox>;

  public triggerButtonText = 'Select a vehicle';

  public premiumAutomobilesList = [
    { title: 'Audi', activated: false, value: 'audi' },
    { title: 'Infiniti', activated: false, value: 'infiniti' },
    { title: 'BMW', activated: false, value: 'bmw' },
    { title: 'Mercedes', activated: false, value: 'mercedes' },
    { title: 'Lexus', activated: false, value: 'lexus' },
    { title: 'Alfa Romeo', activated: false, value: 'alfa romeo' },
    { title: 'Porsche', activated: false, value: 'porsche' },
  ];
  private selectedVehicles: string[] = [];
  public formattedSelectedVehicles?: string;

  isOpen = false;
  // public onMenuOpened() {
  //   this.setFocusOnFirstItem();
  //   this.triggerButtonText = 'Close menu';
  //   this.formattedSelectedVehicles = '';
  // }

  // public onMenuClosed() {
  //   this.matButtonRef.focus();
  //   this.triggerButtonText = 'Select a vehicle';

  //   this.formattedSelectedVehicles =
  //     (this.selectedVehicles.length === 0
  //       ? 'No vehicles selected'
  //       : 'You selected ' + this.selectedVehicles.join(', ')) + '.';
  // }

  async closeLabelsMenu(entry: any) {
    entry.open = false;
    console.log('Menu closed:', entry);
    await this.saveNote(entry, entry.data);
  }

  public onMenuKeyDown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case 'ArrowUp':
        if (index > 0) {
          this.setCheckboxFocus(index - 1);
        } else {
          this.menuItemsRef.last.focus();
        }
        break;
      case 'ArrowDown':
        if (index !== this.menuItemsRef.length - 1) {
          this.setCheckboxFocus(index + 1);
        } else {
          this.setFocusOnFirstItem();
        }
        break;
      case 'Enter':
        event.preventDefault();
        this.premiumAutomobilesList[index].activated = !this.premiumAutomobilesList[index].activated;
        this.onVehicleSelect();
        setTimeout(() => this.matMenuTriggerRef.closeMenu(), 200);
        break;
    }
  }

  public onVehicleSelect() {
    this.selectedVehicles = this.premiumAutomobilesList
      .filter((menuitem) => menuitem.activated)
      .map((menuitem) => menuitem.title);
  }

  private setFocusOnFirstItem(): void {
    const firstCheckbox = this.menuItemsRef.first;
    firstCheckbox.focus();
    firstCheckbox._elementRef.nativeElement.classList.add('cdk-keyboard-focused');
  }

  private setCheckboxFocus(index: number) {
    const checkBox = this.menuItemsRef.get(index);
    if (checkBox) {
      checkBox.focus();
    }
  }

  viewStyle = model<string>('card');

  selectedTags: string[] = [];

  bold = false;

  bold2 = false;

  dialog = inject(MatDialog);

  public layout = inject(LayoutService);

  identity = inject(IdentityService);

  app = inject(AppService);

  toppings = new FormControl('');

  labels = signal<string[]>(['Reminders', 'Inspiration', 'Personal', 'Work']);

  labelMap: { [key: string]: string } = {
    Reminders: 'label1',
    Inspiration: 'label2',
    Personal: 'label3',
    Work: 'label4',
  };

  records = signal<any[]>([]);

  checkedColumns: any = [];

  columnsCopy: any = [{ key: 1, title: 'test' }];

  constructor() {
    // this.layout.disableScrolling();
    this.layout.addAction({
      name: 'New Note',
      icon: 'note_add',
      action: () => {
        this.editNote({
          data: {
            title: '',
            body: '',
            background: '',
            collaborators: [],
            labels: [],
          },
        });
      },
    });

    effect(async () => {
      if (this.app.initialized()) {
        await this.loadNotes();
      }
    });

    // this.toppings.valueChanges.subscribe((tags) => {
    //   console.log('tags:', tags);
    //   // this.onSelectionChange(tags);
    // });
  }

  // async onMenuClose(entry: any) {
  //   console.log('Menu closed:', entry);
  //   console.log('Saving updated note');
  //   await this.saveNote(entry, entry.data);
  // }

  async deleteNote(entry: any) {
    const { status } = await entry.record.delete();

    if (status) {
      this.records.update((records) => records.filter((r) => r.record != entry.record));
    }
  }

  async loadNotes(tags?: any) {
    console.log('VALUE OF TAGS:', tags);

    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          tags: tags,
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
      }
    }

    console.log('All requests:', this.records());
  }

  onSelectionChange(event: any) {
    console.log('Selection changed:', event);
    console.log(this.selectedTags);

    // const formattedTags = this.selectedTags.map((tag) => {
    //   return { [this.labelMap[tag]]: tag };
    // });

    // const formattedTags: { [key: string]: string } = this.selectedTags.reduce((acc: { [key: string]: string }, tag) => {
    //   acc[this.labelMap[tag]] = tag;
    //   return acc;
    // }, {});

    // console.log(formattedTags);

    if (!this.selectedTags || this.selectedTags.length == 0) {
      this.loadNotes();
    } else {
      const tagsString = this.selectedTags.join(',');
      this.loadNotes({ labels: tagsString });
    }
  }

  ngOnDestroy() {
    this.layout.enableScrolling();
  }

  copyNote(entry: any) {
    const clonedData = JSON.parse(JSON.stringify(entry.data));

    this.saveNote(
      {
        data: clonedData,
      },
      clonedData,
    );
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
      // Will this work?
      entry.record.tags.labels = data.labels;

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
            labels: data.labels,
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
        entry.record = record;
        this.records.update((records) => [...records, entry]);
        // await this.loadNotes();
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
}

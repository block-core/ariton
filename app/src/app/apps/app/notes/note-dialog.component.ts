import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface DialogData {
  title: string;
  body: string;
  background: string;
  collaborators: string[];
}

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
})
export class NoteDialogComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: [null],
    body: [null, Validators.required],
    collaborators: ['did:dht:6sf3y5rj4f8sq8rctpkp6w3npotmqrypnsdkc74j1n7uiu1raaco'],
    background: [null],
  });

  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngAfterViewInit() {}

  async onSubmit() {
    const title = this.form.controls.title.value;
    const body = this.form.controls.body.value;
    const collaborators = this.form.controls.collaborators.value!;
    const background = this.form.controls.background.value!;

    this.dialogRef.close({
      title,
      body,
      collaborators,
      background,
    });

    // const { record } = await this.identity.web5.dwn.records.create({
    //   data: {
    //     name: name,
    //     message: message,
    //   },
    //   store: false,
    //   message: {
    //     protocol: 'http://free-for-all-protocol.xyz',
    //     protocolPath: 'post',
    //     schema: 'eph',
    //     // recipient: recipient,
    //     dataFormat: 'application/json',
    //   },
    // });

    // if (record) {
    //   //send record to recipient's DWN
    //   const { status } = await record.send(recipient);
    //   console.log('Record sent:', status, record);

    //   // Show a toast notification
    //   this.snackBar.open('Record sent successfully!', 'Close', {
    //     duration: 3000, // Duration in milliseconds
    //   });
    // }
  }
}

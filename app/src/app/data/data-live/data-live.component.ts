import { Component, effect, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IdentityService } from '../../identity.service';
import { CommonModule } from '@angular/common';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-live',
  standalone: true,
  imports: [
    AgoPipe,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './data-live.component.html',
  styleUrl: './data-live.component.scss',
})
export class DataLiveComponent {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  snackBar = inject(MatSnackBar);

  form = this.fb.group({
    name: [null, Validators.required],
    receiver: ['did:dht:6sf3y5rj4f8sq8rctpkp6w3npotmqrypnsdkc74j1n7uiu1raaco', Validators.required],
    message: [null, Validators.required],
  });

  records = signal<any[]>([]);

  constructor() {
    effect(async () => {
      if (this.identity.initialized()) {
        setInterval(async () => {
          //Query records with plain text data format
          const response = await this.identity.web5.dwn.records.query({
            message: {
              filter: {
                protocol: 'http://free-for-all-protocol.xyz',
                protocolPath: 'post',
                schema: 'eph',
                dataFormat: 'application/json',
              },
            },
          });

          this.records.set([]);

          if (response.records) {
            // Loop through returned records and print text from each
            response.records.forEach(async (record: any) => {
              let json = await record.data.json();

              json = { ...json, id: record.dataCid, author: record.author, created: record.dateCreated };

              this.records.update((records) => [...records, json]);
            });
          }
        }, 5000);
      }
    });
  }

  async ngOnInit() {}

  async onSubmit() {
    const name = this.form.controls.name.value;
    const message = this.form.controls.message.value;
    const recipient = this.form.controls.receiver.value!;

    const { record } = await this.identity.web5.dwn.records.create({
      data: {
        name: name,
        message: message,
      },
      store: false,
      message: {
        protocol: 'http://free-for-all-protocol.xyz',
        protocolPath: 'post',
        schema: 'eph',
        // recipient: recipient,
        dataFormat: 'application/json',
      },
    });

    if (record) {
      //send record to recipient's DWN
      const { status } = await record.send(recipient);
      console.log('Record sent:', status, record);

      // Show a toast notification
      this.snackBar.open('Record sent successfully!', 'Close', {
        duration: 3000, // Duration in milliseconds
      });
    }
  }
}

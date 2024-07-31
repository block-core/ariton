import { Component, effect, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../identity.service';
import { message } from '../../protocols';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../shared/components/profile-card/profile-card.component';
import { ProfileImageDirective } from '../shared/directives/profile-image.directive';
import { DidComponent } from '../shared/components/did/did.component';
import { RouterModule } from '@angular/router';
import { Record } from '@web5/api';

export interface Entry {
  record: Record;
  data: any;
  direction: 'in' | 'out' | any;
}

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    ProfileCardComponent,
    ProfileImageDirective,
    DidComponent,
    RouterModule,
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export class FriendsComponent {
  requests = signal<Entry[]>([]);

  friends = signal<any[]>([]);

  identity = inject(IdentityService);

  app = inject(AppService);

  constructor() {
    effect(() => {
      if (this.app.initialized()) {
        this.loadRequests();
      }
    });
  }

  async loadRequests() {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: message.uri,
          schema: 'https://schema.ariton.app/message/schema/request',
          dataFormat: 'application/json',
        },
      },
    });

    console.log('Records from requests:');
    console.log(records);

    let json = {};
    let recordEntry = null;

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        if (record.author == this.identity.did) {
          json.direction = 'out';
        }

        this.requests.update((requests) => [...requests, json]);

        // recordEntry = record;
        // let recordJson = await record.data.json();
        // json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }
  }

  async accept(entry: Entry) {}

  async reject(entry: Entry) {
    console.log('Rejecting request:', entry);

    // delete the request from the local DWN
    const { status: deleteStatus } = await entry.record.delete();

    // If the recipinent is the current user, then use the author as the target DID.
    const targetDid = entry.record.recipient == this.identity.did ? entry.record.author : entry.record.recipient;

    // send the delete request to the remote DWN
    const { status: deleteSendStatus } = await entry.record.send(targetDid);

    console.log('Delete status:', deleteStatus);
    console.log('deleteSendStatus:', deleteSendStatus);

    // Remove the deleted entry from the requests list
    this.requests.update((requests) => requests.filter((request) => request !== entry));
  }

  ngOnInit() {
    this.friends.set([
      {
        name: 'Lu',
        thumbnail: 'https://ariton.app/assets/lu.jpg',
      },
      {
        name: 'Sondre',
        thumbnail: 'https://ariton.app/assets/sondre.png',
      },
    ]);

    // this.requests.set([
    //   {
    //     name: 'Lu',
    //     thumbnail: 'https://ariton.app/assets/lu.jpg',
    //   },
    // ]);
  }
}

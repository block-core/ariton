import { inject, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { IdentityService } from './identity.service';
import { Record } from '@web5/api';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  connections = inject(ConnectionService);

  identity = inject(IdentityService);

  constructor() {}

  /** Call to setup event listeners and orchestration of data updates. */
  async initialize() {
    // const subscriptionHandler = (record: Record) => {
    //   console.log('received', record);
    // };
    // const { status } = await this.identity.web5.dwn.records.query({
    //   from: 'did:example:bob',
    //   message: {
    //     filter: {
    //       protocol: 'https://schema.org/protocols/social',
    //     },
    //   },
    //   subscriptionHandler,
    // });
  }
}

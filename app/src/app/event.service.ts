import { inject, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { IdentityService } from './identity.service';
import { Record } from '@web5/api';
import { protocolDefinition as connectionDefinition } from '../protocols/connection';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  connections = inject(ConnectionService);

  identity = inject(IdentityService);

  constructor() {}

  /** Call to setup event listeners and orchestration of data updates. */
  async initialize() {
    // Due to bug in web5-js sdk, don't use subscriptions for now.
    return;

    console.log('Event Service initializing...');

    // Some of these should perhaps be handled individually in each server, but
    // for now we will handle event subscriptions in this centralized service.
    const subscriptionHandler = (record: Record) => {
      console.log('!!!! Received local:', record);
    };

    const subscriptionHandlerRemote = (record: Record) => {
      console.log('!!!! Received remote:', record);
    };

    try {
      console.log('Attempting....');
      const { status: status2 } = await this.identity.web5.dwn.records.subscribe({
        // from: this.identity.did,
        message: {
          filter: {
            protocol: connectionDefinition.protocol,
          },
        },
        subscriptionHandler: subscriptionHandlerRemote,
      });

      console.log('SUBSCRIPTION STATUS2: ', status2);
    } catch (err) {
      console.error(err);
    }

    // const { status } = await this.identity.web5.dwn.records.subscribe({
    //   message: {
    //     filter: {
    //       protocol: connectionDefinition.protocol,
    //     },
    //   },
    //   subscriptionHandler,
    // });

    // console.log('SUBSCRIPTION STATUS: ', status);

    // try {
    //   // This invocation will query Bob's DWeb Nodes
    //   const { status: status2 } = await this.identity.web5.dwn.records.subscribe({
    //     from: this.identity.did,
    //     message: {
    //       filter: {
    //         protocol: connectionDefinition.protocol,
    //       },
    //     },
    //     subscriptionHandler: subscriptionHandlerRemote,
    //   });

    //   console.log('SUBSCRIPTION STATUS2: ', status2);
    // } catch (err) {
    //   console.error(err);
    // }

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

    console.log('Event Service initialized.');
  }
}

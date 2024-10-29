import { inject, Injectable, Signal, signal } from '@angular/core';
import { ConnectionService } from './connection.service';
import { IdentityService } from './identity.service';
import { Record } from '@web5/api';
import { protocolDefinition as connectionDefinition } from '../protocols/connection';
import { protocolDefinition as chatDefinition } from '../protocols/chat';
import { protocolDefinition as taskDefinition } from '../protocols/task';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  #connectionProtocol = signal<Record | null>(null);

  get connectionProtocol() {
    return this.#connectionProtocol;
  }

  #chatProtocol = signal<Record | null>(null);

  get chatProtocol() {
    return this.#chatProtocol;
  }

  #taskProtocol = signal<Record | null>(null);

  get taskProtocol() {
    return this.#taskProtocol;
  }

  constructor() {}

  /** Call to setup event listeners and orchestration of data updates. */
  async initialize(identity: IdentityService) {
    // Due to bug in web5-js sdk, don't use subscriptions for now.
    // return;

    console.log('Event Service initializing...');

    // Some of these should perhaps be handled individually in each server, but
    // for now we will handle event subscriptions in this centralized service.
    const subscriptionHandler = (record: Record) => {
      this.#connectionProtocol.set(record);
      console.log('!!!! Received local for connection:', record);
    };

    const subscriptionHandlerRemote = (record: Record) => {
      this.#connectionProtocol.set(record);
      console.log('!!!! Received remote:', record);
    };

    // TODO: Remote subscribe does not work yet. Need to fix in web5-js.
    // try {
    //   console.log('Attempting....');
    //   const { status: status2 } = await identity.web5.dwn.records.subscribe({
    //     from: identity.did,
    //     message: {
    //       filter: {
    //         protocol: connectionDefinition.protocol,
    //       },
    //     },
    //     subscriptionHandler: subscriptionHandlerRemote,
    //   });

    //   console.log('SUBSCRIPTION STATUS2: ', status2);
    // } catch (err) {
    //   console.log('SUBSCRIBE DID NOT WORK REMOTELY!!!');
    //   console.error(err);
    // }

    const subscriptionChatHandler = (record: Record) => {
      this.#chatProtocol.set(record);
      console.log('!!!! Received local for chat:', record);
    };

    const subscriptionTaskHandler = (record: Record) => {
      this.#taskProtocol.set(record);
      console.log('!!!! Received local for task:', record);
    };

    await identity.web5.dwn.records.subscribe({
      message: {
        filter: {
          protocol: connectionDefinition.protocol,
        },
      },
      subscriptionHandler,
    });

    await identity.web5.dwn.records.subscribe({
      message: {
        filter: {
          protocol: chatDefinition.protocol,
        },
      },
      subscriptionHandler: subscriptionChatHandler,
    });

    await identity.web5.dwn.records.subscribe({
      message: {
        filter: {
          protocol: taskDefinition.protocol,
        },
      },
      subscriptionHandler: subscriptionTaskHandler,
    });

    console.log('Event Service initialized.');
  }
}

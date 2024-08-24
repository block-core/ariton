import { inject, Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { protocolDefinition as connectionDefinition } from '../protocols/connection';
import { Record } from '@web5/api';
import { RecordEntry } from './data';
import { DwnDateSort } from '@web5/agent';

export interface ConnectionData {
  title: string;
}

export interface ConnectionEntry extends RecordEntry<ConnectionData> {}

export interface ConnectionBlockData {
  did: string;
}

export interface ConnectionBlockEntry extends RecordEntry<ConnectionBlockData> {}

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  identity = inject(IdentityService);

  constructor() {}

  /** Creates a connection entry that opens up a trust line between identities. */
  async create(data: any) {
    // Create a new connection that is sent to external DWN.
    // We save a local copy to see our outgoing connection requests.
    const eventData = data;

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: eventData,
      message: {
        recipient: eventData.did,
        protocol: connectionDefinition.protocol,
        protocolPath: 'connection',
        schema: connectionDefinition.types.connection.schema,
        dataFormat: connectionDefinition.types.connection.dataFormats[0],
      },
    });

    console.log('Connection created:', status, record);

    return {
      record,
      data: eventData,
      id: record!.id,
    } as ConnectionEntry;
  }

  async request(data: any) {
    // Create a new connection that is sent to external DWN.
    // We save a local copy to see our outgoing connection requests.
    const eventData = data;

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: eventData,
      message: {
        protocol: connectionDefinition.protocol,
        protocolPath: 'request',
        schema: connectionDefinition.types.request.schema,
        dataFormat: connectionDefinition.types.request.dataFormats[0],
      },
    });

    console.log('Notification created:', status, record);

    return {
      record,
      data: eventData,
      id: record!.id,
    } as ConnectionEntry;
  }

  async block(did: string) {
    const data = {
      did: did,
    };

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: {
        did: did,
      },
      message: {
        protocol: connectionDefinition.protocol,
        protocolPath: 'block',
        schema: connectionDefinition.types.block.schema,
        dataFormat: connectionDefinition.types.block.dataFormats[0],
      },
    });

    console.log('Block created:', status, record);

    return {
      record,
      data,
      id: record!.id,
    } as ConnectionBlockEntry;
  }

  async loadRequests() {
    const list: ConnectionEntry[] = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: connectionDefinition.protocol,
          protocolPath: 'request',
          schema: connectionDefinition.types.request.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let notifiationEvent: ConnectionEntry = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    return list;
  }

  async loadConnections(did?: string) {
    const list: ConnectionEntry[] = [];

    const filter = {
      author: did ? did : undefined,
      protocol: connectionDefinition.protocol,
      protocolPath: 'connection',
      schema: connectionDefinition.types.connection.schema,
    };

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter,
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let notifiationEvent: ConnectionEntry = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    return list;
  }

  async loadBlocks() {
    const list: ConnectionEntry[] = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: connectionDefinition.protocol,
          protocolPath: 'block',
          schema: connectionDefinition.types.block.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let notifiationEvent: ConnectionEntry = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    return list;
  }
}

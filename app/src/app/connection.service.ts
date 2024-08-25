import { inject, Injectable, signal } from '@angular/core';
import { IdentityService } from './identity.service';
import { protocolDefinition as connectionDefinition } from '../protocols/connection';
import { Record } from '@web5/api';
import { RecordEntry } from './data';
import { connect } from '../../node_modules/undici-types/api.d';
import { DwnDateSort } from '@web5/agent';

export interface ConnectionData {
  did: string;
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

  blocks = signal<ConnectionBlockEntry[]>([]);

  connections = signal<ConnectionEntry[]>([]);

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

  /** Loads the connections and blocks */
  async initialize() {
    const blocks = await this.loadBlocks();
    this.blocks.set(blocks);

    const connections = await this.loadConnections();
    this.connections.set(connections);
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

  async deleteBlock(entry: any) {
    await entry.record.delete();
    entry.record.send(this.identity.did);
    this.blocks.update((list) => [...list.filter((n) => n.id !== entry.id)]);
  }

  async deleteConnection(entry: any) {
    await entry.record.delete();
    entry.record.send(this.identity.did);
    this.connections.update((list) => [...list.filter((n) => n.id !== entry.id)]);
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
    const list: ConnectionBlockEntry[] = [];

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
      let notifiationEvent: ConnectionBlockEntry = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    return list;
  }
}

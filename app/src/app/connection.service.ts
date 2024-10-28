import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { IdentityService } from './identity.service';
import { protocolDefinition as connectionDefinition } from '../protocols/connection';
import { Record } from '@web5/api';
import { RecordEntry } from './data';
import { connect } from '../../node_modules/undici-types/api.d';
import { DwnDateSort } from '@web5/agent';
import { UtilityService } from './utility.service';
import { VerifiableCredential } from '@web5/credentials';
import { credential } from '../protocols';
import { EventService } from './event.service';

export interface ConnectionData {
  did?: string;
  title?: string;
  app: string;
  recordId?: string;
  vc?: string;
}

export interface ConnectionEntry extends RecordEntry<ConnectionData> {}

export interface ConnectionBlockData {
  did: string;
}

export interface ConnectionBlockEntry extends RecordEntry<ConnectionBlockData> {}

export enum ConnectionType {
  /** Used for sharing access to data, such as Tasks or Notes. */
  Data = 'data',

  /** Used for storing friendships. */
  Friend = 'friend',

  /** Sharing a verifiable credential. */
  Credential = 'credential',
}

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  identity = inject(IdentityService);

  events = inject(EventService);

  utility = inject(UtilityService);

  blocks = signal<ConnectionBlockEntry[]>([]);

  connections = signal<ConnectionEntry[]>([]);

  friends = computed(() => this.connections().filter((c) => c.record.tags['type'] == 'friend'));

  friendRequests = computed(() => this.requests().filter((c) => c.record.tags['type'] == 'friend'));

  requests = signal<ConnectionEntry[]>([]);

  loading = signal<boolean>(false);

  constructor() {
    effect(
      async () => {
        // Whenever there is an change to the connection protocol records, we will update the connections.
        if (this.events.connectionProtocol()) {
          await this.reloadRequests();
        }
      },
      { allowSignalWrites: true },
    );
  }

  /** Creates a connection entry that opens up a trust line between identities. */
  async create(entry: ConnectionEntry, type: ConnectionType) {
    // const eventData = data;

    // If the connection is a friend request, we need to create a VC for the friend.
    // if (type == ConnectionType.Friend) {
    //   // Create a reverse connection for the friend and issue them a VC.
    //   await this.approveFriendRequest(entry);
    // }

    const tags = {
      type: type,
    };

    let entryData = entry.data;

    console.log('CONNECTION SERVICE ENTRY DATA:', entryData);

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: entryData, // Copy the data over
      message: {
        tags: tags,
        recipient: entry.record.creator, // The recipient is the author of previous request.
        protocol: connectionDefinition.protocol,
        protocolPath: 'connection',
        schema: connectionDefinition.types.connection.schema,
        dataFormat: connectionDefinition.types.connection.dataFormats[0],
      },
    });

    console.log('Connection created:', status, record);

    const connectionEntry = {
      record,
      data: entryData,
      id: record!.id,
    } as ConnectionEntry;

    this.connections.update((list) => [connectionEntry, ...list]);

    // Send to self, not to recipient.
    this.utility.executeAsyncWithToast(entry.record.send(this.identity.did));

    // this.utility.executeAsyncWithToast(entry.record.send(entryData.did));

    return connectionEntry;
  }

  /** Called when a user has replied to a friend request and there is an incoming two-way VC to be persisted. */
  async validateAndStoreCredential(entry: ConnectionEntry) {
    const signedVcJwt = entry.data.vc;

    if (!signedVcJwt) {
      throw new Error('The incoming VC is missing.');
    }

    try {
      await VerifiableCredential.verify({ vcJwt: signedVcJwt });
    } catch (error) {
      console.error('Error verifying VC:', error);
      return;
    }

    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
    const targetDid = vc.issuer;

    console.log('PARSED INVCOMING VC:', vc);
    console.log('vc.issuer === this.identity.did:', vc.issuer === this.identity.did);

    // Validate that the inner VC is ours, if OK, we can go ahead and persist the VC.
    // if (vc.issuer === this.identity.did) {
    // Persist the two-way VC, these are the only ones that we store for safe-keeping, not the one-way.
    const { record: record2 } = await this.identity.web5.dwn.records.create({
      data: signedVcJwt,
      message: {
        schema: credential.friendship,
        dataFormat: credential.format,
        published: false,
      },
    });
    console.log('TWO WAY VC RECORD:', record2);

    const { status } = await record2!.send(this.identity.did);
    console.log('Record sent:', status, record2);

    // Delete the incoming VC record, as it has been processed.
    await entry.record.delete();
    entry.record.send(this.identity.did);

    // // If the VC issuer is different than data recipient, then reject the request.
    // if (vc.issuer != entry.record.recipient) {
    //   console.error('VC issuer is different than the recipient of the request.');
    //   return;
    // }

    console.log('Friend request validated');
  }

  async removeFriendship(entry: ConnectionEntry) {}

  async acceptFriendRequest(entry: ConnectionEntry) {
    // TOOD: We should obviously verify the incoming VC is correct, that it belongs to the
    // user that sent it, etc. But for now, we'll just accept it. If we don't validate, anyone
    // could send us a VC and we'd accept it, opening up a friend connection that is incorrect.
    // This validation should be done before even showing the request to the user, and a delete
    // request should be sent to the sender if the validation fails.
    //
    // We will perform additional verification here, to avoid accepting a request that is invalid.

    const signedVcJwt = entry.data.vc;

    if (!signedVcJwt) {
      throw new Error('The incoming VC is missing.');
    }

    console.log('signedVcJwt:', signedVcJwt);

    if (!signedVcJwt) {
      return;
    }

    try {
      await VerifiableCredential.verify({ vcJwt: signedVcJwt });
    } catch (error) {
      console.error('Error verifying VC:', error);
      return;
    }

    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });

    // First validate if the VC has been issued to us.
    if (vc.subject != this.identity.did) {
      console.error('VC is not valid.');
      return;
    }

    // Validae that the record and VC is same.
    if (vc.issuer != entry.record.creator) {
      console.error('VC is not valid.');
      return;
    }

    // const targetDid = vc.issuer;

    // // If the VC issuer is different than data author, then reject the request.
    // if (vc.issuer != entry.record.creator) {
    //   console.error('VC issuer is different than the recipient of the request.');
    //   return;
    // }

    // Also verify that the incoming VC contains an inner VC that we have issued to the sender.
    const subject = vc.vcDataModel.credentialSubject as any;
    const innerVcJwt = subject.vc;

    console.log('INNER VC JWT:', innerVcJwt);

    try {
      await VerifiableCredential.verify({ vcJwt: innerVcJwt });
    } catch (error) {
      console.error('Error verifying VC:', error);
      return;
    }

    const vcInner = VerifiableCredential.parseJwt({ vcJwt: innerVcJwt });

    console.log('VC issuer: ', vcInner.issuer);
    console.log('this.identity.did', this.identity.did);

    // The inner issuer must be us.
    if (vcInner.issuer != this.identity.did) {
      console.error('VC is not valid.');
      return;
    }

    // The subject of inner must be issuer of outer.
    if (vcInner.subject != vc.issuer) {
      console.error('VC is not valid.');
      return;
    }

    console.log('Friend request validated');

    // const twoWayVC = await VerifiableCredential.create({
    //   type: credential.friendship,
    //   issuer: this.identity.did,
    //   subject: targetDid,
    //   data: {
    //     vc: signedVcJwt,
    //   },
    // });

    // console.log('TWO WAY VC:', twoWayVC);

    // const bearerDid = await this.identity.activeAgent().identity.get({ didUri: this.identity.did });
    // const vc_jwt = await twoWayVC.sign({ did: bearerDid!.did });
    // console.log('TWO WAY VC JWT:', vc_jwt);

    // Persist the two-way VC, these are the only ones that we store for safe-keeping, not the one-way.
    const { record } = await this.identity.web5.dwn.records.create({
      data: signedVcJwt,
      message: {
        schema: credential.friendship,
        dataFormat: credential.format,
        published: false,
      },
    });
    console.log('TWO WAY VC RECORD:', record);

    // Send to self, don't wait.
    record!.send(this.identity.did);

    return record;

    // Delete the incoming VC record, as it has been processed.
    // Don't delete, we delete outside.
    // await this.deleteRequest(entry);

    // const recordData: ConnectionData = {
    //   vc: signedVcJwt,
    //   app: 'friends',
    // };

    // const tags = {
    //   type: ConnectionType.Credential,
    // };

    // // Next step is to send the VC to the sender of the request, so they can also have a two-way VC.
    // // VCs can be sent to anyone, even if they are not in the user's DWN. This is a way to establish
    // // various connections. VCs are automatically or manually accepted by users.
    // const { status: requestCreateStatus, record: messageRecord } = await this.identity.web5.dwn.records.create({
    //   data: recordData,
    //   store: false, // We don't need to store a copy of this locally.
    //   message: {
    //     tags,
    //     recipient: targetDid,
    //     protocol: connectionDefinition.protocol,
    //     protocolPath: 'request',
    //     schema: connectionDefinition.types.request.schema,
    //     dataFormat: connectionDefinition.types.request.dataFormats[0],

    //     // protocol: messageDefinition.protocol,
    //     // protocolPath: 'credential',
    //     // schema: messageDefinition.types.credential.schema,
    //     // dataFormat: messageDefinition.types.credential.dataFormats[0],
    //   },
    // });

    // console.log('Request create status:', requestCreateStatus);

    // const { status: requestStatus } = await messageRecord!.send(targetDid);

    // Remove the accepted entry from the requests list
    // await this.reject(entry);

    // if (requestStatus.code !== 202) {
    //   this.app.openSnackBar(`Friend request failed.Code: ${requestStatus.code}, Details: ${requestStatus.detail}.`);
    // } else {
    //   this.app.openSnackBar('Friend request accepted');

    //   // Remove the accepted entry from the requests list
    //   await this.reject(entry);
    // }
  }

  async approveFriendRequest(entry: ConnectionEntry) {
    const signedVcJwt = entry.data.vc;

    if (!signedVcJwt) {
      throw new Error('The incoming VC is missing.');
    }

    console.log('signedVcJwt:', signedVcJwt);

    if (!signedVcJwt) {
      return;
    }

    try {
      await VerifiableCredential.verify({ vcJwt: signedVcJwt });
    } catch (error) {
      console.error('Error verifying VC:', error);
      return;
    }

    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });

    // First validate if the VC has been issued to us.
    if (vc.subject != this.identity.did) {
      console.error('VC is not valid.');
      return;
    }

    // Validae that the record and VC is same.
    if (vc.issuer != entry.record.creator) {
      console.error('VC is not valid.');
      return;
    }

    // Persist the two-way VC, these are the only ones that we store for safe-keeping, not the one-way.
    const { record } = await this.identity.web5.dwn.records.create({
      data: signedVcJwt,
      message: {
        schema: credential.friendship,
        dataFormat: credential.format,
        published: false,
      },
    });
    console.log('TWO WAY VC RECORD:', record);

    // Send to self, don't wait.
    record!.send(this.identity.did);

    // Delete the incoming VC record, as it has been processed.
    await this.deleteRequest(entry);

    // const recordData: ConnectionData = {
    //   vc: signedVcJwt,
    //   app: 'friends',
    // };

    // const tags = {
    //   type: ConnectionType.Credential,
    // };

    // // Next step is to send the VC to the sender of the request, so they can also have a two-way VC.
    // // VCs can be sent to anyone, even if they are not in the user's DWN. This is a way to establish
    // // various connections. VCs are automatically or manually accepted by users.
    // const { status: requestCreateStatus, record: messageRecord } = await this.identity.web5.dwn.records.create({
    //   data: recordData,
    //   store: false, // We don't need to store a copy of this locally.
    //   message: {
    //     tags,
    //     recipient: targetDid,
    //     protocol: connectionDefinition.protocol,
    //     protocolPath: 'request',
    //     schema: connectionDefinition.types.request.schema,
    //     dataFormat: connectionDefinition.types.request.dataFormats[0],

    //     // protocol: messageDefinition.protocol,
    //     // protocolPath: 'credential',
    //     // schema: messageDefinition.types.credential.schema,
    //     // dataFormat: messageDefinition.types.credential.dataFormats[0],
    //   },
    // });

    // console.log('Request create status:', requestCreateStatus);

    // const { status: requestStatus } = await messageRecord!.send(targetDid);

    // Remove the accepted entry from the requests list
    // await this.reject(entry);

    // if (requestStatus.code !== 202) {
    //   this.app.openSnackBar(`Friend request failed.Code: ${requestStatus.code}, Details: ${requestStatus.detail}.`);
    // } else {
    //   this.app.openSnackBar('Friend request accepted');

    //   // Remove the accepted entry from the requests list
    //   await this.reject(entry);
    // }
  }

  /** Loads the connections and blocks */
  async initialize() {
    const blocks = await this.loadBlocks();
    this.blocks.set(blocks);

    const connections = await this.loadConnections();
    this.connections.set(connections);

    await this.reloadRequests();
  }

  async reloadRequests() {
    this.loading.set(true);
    const requests = await this.loadRequests();
    this.requests.set(requests);
    this.loading.set(false);
  }

  async request(did: string, data: ConnectionData, type: ConnectionType) {
    // Create a new connection that is sent to external DWN.
    // We save a local copy to see our outgoing connection requests.
    const eventData = data;

    const tags = {
      type: type,
    };

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: eventData,
      message: {
        tags: tags,
        recipient: did,
        protocol: connectionDefinition.protocol,
        protocolPath: 'request',
        schema: connectionDefinition.types.request.schema,
        dataFormat: connectionDefinition.types.request.dataFormats[0],
      },
    });

    console.log('Notification created:', status, record);

    const entry = {
      record,
      data: eventData,
      id: record!.id,
      direction: 'out',
    } as ConnectionEntry;

    this.requests.update((list) => [entry, ...list]);

    // Send to self and recipient.
    this.utility.executeAsyncWithToast(entry.record.send(this.identity.did));
    this.utility.executeAsyncWithToast(entry.record.send(did));

    return entry;
  }

  async deleteBlock(entry: ConnectionEntry) {
    await entry.record.delete();
    this.blocks.update((list) => [...list.filter((n) => n.id !== entry.id)]);
    this.utility.executeAsyncWithToast(entry.record.send(this.identity.did));
  }

  async deleteConnection(entry: ConnectionEntry) {
    await entry.record.delete();
    this.connections.update((list) => [...list.filter((n) => n.id !== entry.id)]);
    this.utility.executeAsyncWithToast(entry.record.send(this.identity.did));
  }

  // getAuthor(record: Record) {
  //   if (record.initialWrite) {
  //     return record.initialWrite.authorization.ownerSignature.;
  //   } else {
  //     return record.author;
  //   }
  // }

  async deleteRequest(entry: ConnectionEntry) {
    // Original author, must be read before updating the record (like delete).
    const author = entry.record.creator;

    console.log('Delete requested for this author:' + author);

    await entry.record.delete();

    this.requests.update((list) => [...list.filter((n) => n.id !== entry.id)]);

    // Send delete both to self and the recipient.
    this.utility.executeAsyncWithToast(entry.record.send(this.identity.did));

    // If we are the author of this request, the recipient is the target DID.
    if (author == this.identity.did) {
      this.utility.executeAsyncWithToast(entry.record.send(entry.record.recipient));
    } else {
      // If we are the recipient of this request, the author is the target DID.
      this.utility.executeAsyncWithToast(entry.record.send(author));
    }
  }

  /** Deletes all incoming requests from the specified DID. */
  async deleteRequests(did: string) {
    if (!did) {
      return;
    }

    // Find all connection requests from this user and delete them.
    const entries = await this.loadRequests(did);

    for (const entry of entries) {
      console.log('DELETE THIS ENTRY:', entry);
      await this.deleteRequest(entry);
    }
  }

  /** Deletes all connections from the specified DID. */
  async deleteConnections(did: string) {
    if (!did) {
      return;
    }

    // Find all connection requests from this user and delete them.
    const entries = await this.loadConnections(did);

    for (const entry of entries) {
      await entry.record.delete();

      // Update the list of connections on external DWNs for user.
      await entry.record.send(this.identity.did);

      this.connections.update((list) => [...list.filter((n) => n.id !== entry.id)]);
    }
  }

  /** Blocks a specif DID, this also deletes all the incoming requests. */
  async block(did: string) {
    console.log('BLOCKS THIS DID:', did);

    if (!did) {
      return;
    }

    const data = {
      did: did,
    };

    console.log('Delete all Requests and Connections before updating block list.');

    // After creating the block, we clean up data from this blocked user.
    await this.deleteRequests(did);
    await this.deleteConnections(did);

    let blockEntry = this.blocks().find((b) => b.data.did == did);

    if (!blockEntry) {
      // Get existing block record.
      const { records } = await this.identity.web5.dwn.records.query({
        message: {
          filter: {
            recipient: did,
            protocol: connectionDefinition.protocol,
            protocolPath: 'block',
            schema: connectionDefinition.types.block.schema,
            dataFormat: connectionDefinition.types.block.dataFormats[0],
          },
          dateSort: DwnDateSort.CreatedAscending,
        },
      });

      let blockRecord: Record;

      if (records!.length == 0) {
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

        blockRecord = record!;
      } else {
        blockRecord = records![0];
      }

      blockEntry = {
        record: blockRecord,
        data,
        id: blockRecord!.id,
      } as ConnectionBlockEntry;

      // Update the block lists after delete requests, or else there is a validation that interfeers within the deleteRequests.
      this.blocks.update((list) => [...list, blockEntry!]);
    }

    console.log('The Block record', blockEntry);

    return blockEntry;
  }

  // async loadRequests() {
  //   const list: ConnectionEntry[] = [];

  //   const { records } = await this.identity.web5.dwn.records.query({
  //     message: {
  //       filter: {
  //         // recipient: inbound ? this.identity.did : undefined,
  //         protocol: connectionDefinition.protocol,
  //         protocolPath: 'request',
  //         schema: connectionDefinition.types.request.schema,
  //       },
  //       dateSort: DwnDateSort.CreatedAscending,
  //     },
  //   });

  //   for (let record of records!) {
  //     const data = await record.data.json();
  //     let notifiationEvent: ConnectionEntry = { record, data, id: record.id };

  //     if (record.author == this.identity.did) {
  //       notifiationEvent.direction = 'out';
  //     }

  //     list.push(notifiationEvent);
  //   }

  //   console.log('REQUESTS: ', list);

  //   return list;
  // }

  async loadRequests(did?: string) {
    const list: ConnectionEntry[] = [];

    const filter = {
      author: did ? did : undefined,
      protocol: connectionDefinition.protocol,
      protocolPath: 'request',
      schema: connectionDefinition.types.request.schema,
    };

    const query = {
      from: this.identity.did,
      message: {
        filter,
        dateSort: DwnDateSort.CreatedAscending,
      },
    };

    console.log('IDENTITY: ', this.identity);
    console.log('LOAD REQUESTS:', query);

    const { records } = await this.identity.web5.dwn.records.query(query);

    for (let record of records!) {
      if (this.blocked(record.creator)) {
        // Call delete without waiting and continue. This will normally be processed by background process
        // which will remove all requests from blocked identities.
        record.delete();

        // Send the delete to ourselves.
        record.send(this.identity.did);

        // Send the delete to the author.
        record.send(record.creator);

        continue;
      }

      const data = await record.data.json();
      let notifiationEvent: ConnectionEntry = { record, data, id: record.id };

      if (record.creator == this.identity.did) {
        notifiationEvent.direction = 'out';
      }

      list.push(notifiationEvent);
    }

    console.log('REQUESTS: ', list);

    return list;
  }

  blocked(did: string) {
    return this.blocks().find((b) => b.data.did == did) !== undefined;
  }

  async loadConnections(did?: string) {
    const list: ConnectionEntry[] = [];

    const filter = {
      recipient: did ? did : undefined,
      protocol: connectionDefinition.protocol,
      protocolPath: 'connection',
      schema: connectionDefinition.types.connection.schema,
    };

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter,
        dateSort: DwnDateSort.CreatedDescending,
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

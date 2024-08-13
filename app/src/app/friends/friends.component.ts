import { Component, effect, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../identity.service';
import { credential, message } from '../../protocols';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../shared/components/profile-card/profile-card.component';
import { ProfileImageDirective } from '../shared/directives/profile-image.directive';
import { DidComponent } from '../shared/components/did/did.component';
import { RouterModule } from '@angular/router';
import { Record } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials';
import { protocolDefinition as messageDefinition } from '../../protocols/message';
import { LayoutService } from '../layout.service';

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

  layout = inject(LayoutService);

  app = inject(AppService);

  constructor() {
    this.layout.resetActions();

    effect(async () => {
      if (this.app.initialized()) {
        await this.processFriends();
        await this.loadFriends();
        await this.loadRequests();
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

        console.log('All requests:', this.requests());

        // recordEntry = record;
        // let recordJson = await record.data.json();
        // json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }
  }

  async accept(entry: Entry) {
    // TOOD: We should obviously verify the incoming VC is correct, that it belongs to the
    // user that sent it, etc. But for now, we'll just accept it. If we don't validate, anyone
    // could send us a VC and we'd accept it, opening up a friend connection that is incorrect.
    // This validation should be done before even showing the request to the user, and a delete
    // request should be sent to the sender if the validation fails.
    //
    // We will perform additional verification here, to avoid accepting a request that is invalid.

    const signedVcJwt = entry.data.vc;

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
    const targetDid = vc.issuer;

    // If the VC issuer is different than data record author, then reject the request.
    if (vc.issuer != entry.record.author) {
      console.error('VC issuer is different than data record author');
      return;
    }

    console.log('Friend request validated');

    const twoWayVC = await VerifiableCredential.create({
      type: credential.friendship,
      issuer: this.identity.did,
      subject: targetDid,
      data: {
        vc: signedVcJwt,
      },
    });

    console.log('TWO WAY VC:', twoWayVC);

    const bearerDid = await this.identity.activeAgent().identity.get({ didUri: this.identity.did });
    const vc_jwt = await twoWayVC.sign({ did: bearerDid!.did });
    console.log('TWO WAY VC JWT:', vc_jwt);

    // Persist the two-way VC, these are the only ones that we store for safe-keeping, not the one-way.
    const { record } = await this.identity.web5.dwn.records.create({
      data: vc_jwt,
      message: {
        schema: credential.friendship,
        dataFormat: credential.format,
        published: false,
      },
    });
    console.log('TWO WAY VC RECORD:', record);

    const { status } = await record!.send(this.identity.did);
    console.log('Record sent:', status, record);

    // Next step is to send the VC to the sender of the request, so they can also have a two-way VC.
    // VCs can be sent to anyone, even if they are not in the user's DWN. This is a way to establish
    // various connections. VCs are automatically or manually accepted by users.
    const { status: requestCreateStatus, record: messageRecord } = await this.identity.web5.dwn.records.create({
      data: { vc: vc_jwt },
      store: false, // We don't need to store a copy of this locally.
      message: {
        recipient: targetDid,
        protocol: messageDefinition.protocol,
        protocolPath: 'credential',
        schema: messageDefinition.types.credential.schema,
        dataFormat: messageDefinition.types.credential.dataFormats[0],
      },
    });

    console.log('Request create status:', requestCreateStatus);

    const { status: requestStatus } = await messageRecord!.send(targetDid);

    if (requestStatus.code !== 202) {
      this.app.openSnackBar(`Friend request failed.Code: ${requestStatus.code}, Details: ${requestStatus.detail}.`);
    } else {
      this.app.openSnackBar('Friend request accepted');

      // Remove the accepted entry from the requests list
      await this.reject(entry);
    }
  }

  async reject(entry: Entry) {
    console.log('Rejecting request:', entry);

    // If the recipinent is the current user, then use the author as the target DID.
    // Very important to read this BEFORE running local delete, as that mutates the record.
    const targetDid = entry.record.recipient == this.identity.did ? entry.record.author : entry.record.recipient;

    console.log('Target DID:', targetDid);
    console.log('this.identity.did:', this.identity.did);
    console.log('entry.record.recipient:', entry.record.recipient);
    console.log('entry.record.author:', entry.record.author);

    // delete the request from the local DWN
    const { status: deleteStatus } = await entry.record.delete();

    // send the delete request to the remote DWN
    const { status: deleteSendStatus } = await entry.record.send(targetDid);

    console.log('Delete status:', deleteStatus);
    console.log('deleteSendStatus:', deleteSendStatus);

    // Remove the deleted entry from the requests list
    this.requests.update((requests) => requests.filter((request) => request !== entry));
  }

  async processFriends() {
    // TODO: Processing incoming accepted friend requests should happen in a backgrond task, not here.

    // Get all incoming VC records in the message protocol.
    var { records: vcRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: message.uri,
          schema: messageDefinition.types.credential.schema,
          dataFormat: messageDefinition.types.credential.dataFormats[0],
        },
      },
    });

    console.log('VC Records:', vcRecords);

    // Automatically accept all incoming friend requests VCs, but validate that the
    // inner VC is correct.

    for (const record of vcRecords!) {
      console.log('Record:', record);

      const json = await record.data.json();
      console.log('JSON:', json);

      try {
        await VerifiableCredential.verify({ vcJwt: json.vc });
      } catch (error) {
        console.error('Error verifying VC:', error);
        console.log('THIS REQUEST SHOULD BE DELETED FROM DWN', record.id);
      }

      const vc = VerifiableCredential.parseJwt({ vcJwt: json.vc });

      console.log('PARSED INVCOMING VC:', vc);
      console.log('vc.issuer === this.identity.did:', vc.issuer === this.identity.did);

      // Validate that the inner VC is ours, if OK, we can go ahead and persist the VC.
      // if (vc.issuer === this.identity.did) {
      // Persist the two-way VC, these are the only ones that we store for safe-keeping, not the one-way.
      const { record: record2 } = await this.identity.web5.dwn.records.create({
        data: json.vc,
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
      await record?.delete();
      // }
    }
  }

  async loadFriends() {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          schema: credential.friendship,
          dataFormat: credential.format,
        },
      },
    });

    console.log('Friend VCs:');
    console.log(records);

    let json = {};
    let recordEntry = null;

    this.friends.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records!) {
        let data = await record.data.text();
        let vc = VerifiableCredential.parseJwt({ vcJwt: data });

        let did = vc.issuer;

        // If the outher issuer is us, get the inner one.
        if (vc.issuer == this.identity.did) {
          const subject = vc.vcDataModel.credentialSubject as any;
          let vcInner = VerifiableCredential.parseJwt({ vcJwt: subject.vc });
          did = vcInner.issuer;
        }

        let json: any = { record: record, data: { did } };

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.friends.update((requests) => [...requests, json]);

        console.log('All friends:', this.friends());

        // recordEntry = record;
        // let recordJson = await record.data.json();
        // json = { ...recordJson, id: record.dataCid, did: record.author, created: record.dateCreated };
      }
    }
  }

  ngOnInit() {
    this.layout.marginOff();

    // this.friends.set([
    //   {
    //     name: 'Lu',
    //     thumbnail: 'https://ariton.app/assets/lu.jpg',
    //   },
    //   {
    //     name: 'Sondre',
    //     thumbnail: 'https://ariton.app/assets/sondre.png',
    //   },
    // ]);
    // this.requests.set([
    //   {
    //     name: 'Lu',
    //     thumbnail: 'https://ariton.app/assets/lu.jpg',
    //   },
    // ]);
  }
}

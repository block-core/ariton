import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../../../app.service';
import { IdentityService } from '../../../identity.service';
import { VerifiableCredential } from '@web5/credentials';
import { credential } from '../../../../protocols';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutService } from '../../../layout.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../../utility.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-kcc',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
  ],
  templateUrl: './kcc.component.html',
  styleUrl: './kcc.component.scss',
})
export class KnownCustomerCredentialComponent {
  vcType = 'IdentityCredential';

  app = inject(AppService);

  util = inject(UtilityService);

  identity = inject(IdentityService);

  layout = inject(LayoutService);

  loading = false;

  signed = false;

  lookupSigned: boolean | undefined = undefined;

  did = 'did:dht:rr1w5z9hdjtt76e6zmqmyyxc5cfnwjype6prz45m6z1qsbm8yjao';

  identifier = '';

  name = '';

  gender = 'M';

  birthdate = '';

  photograph = '';

  credential = '';

  issueDate = '';

  expiryDate = '';

  countryOfResidence = '';

  tier = 'Silver';

  jurisdiction = '';

  document_verification = 'passport utility_bill driver_license';

  permissionRequested = false;

  constructor() {
    this.layout.marginOff();

    const issueDate = new Date();
    issueDate.setHours(24, 59, 59, 0);

    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 5);

    this.issueDate = issueDate.toISOString();
    this.expiryDate = expirationDate.toISOString();

    effect(() => {
      if (this.app.initialized()) {
        this.load();
      }
    });
  }

  permissionReceived = false;

  async requestPermission() {
    this.permissionRequested = true;
    const issuerDidUri = this.identity.did;

    // The CORS configuration on this endpoint doesn't allow us to read it in the browser,
    // but it doesn't matter as the browser doesn't need to read the response, the request will
    // go out and the server will register the permission.
    try {
      const result = await fetch(`https://vc-to-dwn.tbddev.org/authorize?issuerDid=${issuerDidUri}`);
      console.log(result);
    } catch (error) {
      console.log('Failed to request permission:', error);
    }

    this.permissionReceived = true;
  }

  async load() {
    var { records: vcRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          schema: this.vcType,
          dataFormat: credential.format,
        },
      },
    });

    if (vcRecords!.length > 0) {
      this.signed = true;
    }
  }

  copyValue() {
    this.util.copyToClipboard(this.credential);
  }

  async sign() {
    this.loading = true;

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 5);
    expirationDate.setHours(24, 0, 0, 0);

    const vc = await VerifiableCredential.create({
      // type: this.vcType,
      issuer: this.identity.did,
      subject: this.did,
      data: {
        countryOfResidence: this.countryOfResidence,
        tier: this.tier,
        jurisdiction: {
          country: this.jurisdiction,
        },
      },
      expirationDate: expirationDate.toISOString(),
      evidence: [
        {
          kind: 'document_verification',
          checks: this.document_verification.split(' '),
        },
      ],
      credentialSchema: {
        id: 'https://vc.schemas.host/kcc.schema.json', // URL to the schema used
        type: 'JsonSchema', // Format type of the schema used for the KCC
      },
    });

    const did = await this.identity.activeAgent().did.get({ didUri: this.identity.did });
    console.log('DID:', did);

    const identities = await this.identity.activeAgent().identity.list();
    console.log('Identitites:', identities);

    const bearerDid = await this.identity.activeAgent().identity.get({ didUri: this.identity.did });

    console.log('this.identity.did:', this.identity.did);
    console.log('Bearer DID:', bearerDid);
    console.log('Active Agent:', this.identity.activeAgent());

    const vc_jwt = await vc.sign({ did: bearerDid!.did });

    this.credential = vc_jwt;

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: vc_jwt,
      message: {
        // tags: {
        //   type: 'FreeID',
        // },

        protocol: 'https://vc-to-dwn.tbddev.org/vc-protocol',
        protocolPath: 'credential',
        protocolRole: 'issuer',
        schema: 'https://vc-to-dwn.tbddev.org/vc-protocol/schema/credential',
        dataFormat: credential.format,
        published: true,
      },
    });

    console.log('VC STATUS:', status);
    console.log('VC RECORD:', record);

    // Send to the credential receiver:
    const { status: sendStatus } = await record!.send(this.did);
    console.log('Record sent:', sendStatus, record);

    this.signed = true;
    this.loading = false;
  }

  async lookup() {
    this.lookupSigned = undefined;

    const { records } = await this.identity.web5.dwn.records.query({
      from: this.did,
      message: {
        filter: {
          schema: 'https://vc-to-dwn.tbddev.org/vc-protocol/schema/credential',
          dataFormat: credential.format,
        },
      },
    });

    console.log('VC RECORDS:', records);

    // TODO: Here we should actually validate the VC.
    if (records!.length > 0) {
      this.lookupSigned = true;

      const jwt_vc = await records![0].data.text();

      console.log(jwt_vc);

      const vc = VerifiableCredential.parseJwt({ vcJwt: jwt_vc });

      console.log(vc.vcDataModel.credentialSubject);

      this.vc = vc;
      this.lookupCredential = vc.vcDataModel.credentialSubject;
      console.log('VC:', this.vc);
    } else {
      this.lookupSigned = false;
    }
  }

  vc: VerifiableCredential | null = null;
  lookupCredential: any = null;

  async withdraw() {
    var { records: vcRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          schema: this.vcType,
          dataFormat: credential.format,
        },
      },
    });

    for (const record of vcRecords!) {
      await record.delete();
      record.send(this.identity.did);
    }

    this.loading = false;
    this.signed = false;
  }
}

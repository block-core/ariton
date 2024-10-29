import { Component, effect, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AppService } from '../../../app.service';
import { IdentityService } from '../../../identity.service';
import { credential } from '../../../../protocols';
import { VerifiableCredential } from '@web5/credentials';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-freeid',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './freeid.component.html',
  styleUrl: './freeid.component.scss',
})
export class FreeIDComponent {
  // Source: https://github.com/WorldVoluntaryistOrganisation/VerificationServices/blob/main/services.json
  services = [
    {
      did: '123',
      name: 'Liberstad FreeID Office',
      location: 'Liberstad, Norway',
      website: 'https://freeid.me',
    },
    {
      did: '321',
      name: 'Montelibero Verification Office',
      location: 'Montelibero City, Bar, Montenegro',
      website: 'https://montelibero.org',
    },
  ];

  vcType = 'IdentityCredential';

  app = inject(AppService);

  identity = inject(IdentityService);

  layout = inject(LayoutService);

  loading = false;

  signed = false;

  lookupSigned: boolean | undefined = undefined;

  did = '';

  constructor() {
    this.layout.marginOff();

    effect(() => {
      if (this.app.initialized()) {
        this.load();
      }
    });
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

  async sign() {
    this.loading = true;

    const vc = await VerifiableCredential.create({
      type: 'WorldVoluntaryistOrganisationCredential',
      issuer: this.identity.did,
      subject: this.identity.did,
      data: {
        signed: 'The Voluntaryist Covenant',
        version: '1.0',
        hash: '856da8db8fec583255fa09cc19c64a93d44cba7a4d6c408282643fc581ae6c4b',
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

    const { record } = await this.identity.web5.dwn.records.create({
      data: vc_jwt,
      message: {
        schema: this.vcType,
        dataFormat: credential.format,
        published: true,
      },
    });

    console.log('VC RECORD:', record);

    const { status } = await record!.send(this.identity.did);
    console.log('Record sent:', status, record);

    this.signed = true;
  }

  async lookup() {
    this.lookupSigned = undefined;

    const { records } = await this.identity.web5.dwn.records.query({
      from: this.did,
      message: {
        filter: {
          schema: this.vcType,
          dataFormat: credential.format,
        },
      },
    });

    console.log('VC RECORDS:', records);

    // TODO: Here we should actually validate the VC.
    if (records!.length > 0) {
      this.lookupSigned = true;
    } else {
      this.lookupSigned = false;
    }
  }

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

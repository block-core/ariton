import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IdentityService } from '../../../identity.service';
import { CryptoService } from '../../../crypto.service';
import { Account, AppService } from '../../../app.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DidStellar } from '../../../../crypto/methods/did-stellar';
import { PortableIdentity } from '@web5/agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss',
})
export class RestoreComponent {
  private fb = inject(FormBuilder);

  crypto = inject(CryptoService);

  app = inject(AppService);

  route = inject(Router);

  private identity = inject(IdentityService);

  addressForm = this.fb.group({
    recoveryPhrase: [null, Validators.required],
    importType: ['stellar', Validators.required],
  });

  async onSubmit() {
    console.log(this.addressForm.controls.recoveryPhrase.value);

    this.addressForm.disable();

    this.app.loading.set(true);

    if (this.addressForm.controls.importType.value === 'stellar') {
      const agent = this.identity.activeAgent();

      const bearerDid = await DidStellar.fromPrivateKey({
        privateKey: this.addressForm.controls.recoveryPhrase.value!,
      });

      console.log('Bearer DID: ', bearerDid);

      const stellarPortableDid = await bearerDid.export();

      const portableIdentity: PortableIdentity = {
        portableDid: stellarPortableDid,
        metadata: {
          name: 'Stellar Identity',
          tenant: stellarPortableDid.uri,
          uri: stellarPortableDid.uri,
        },
      };

      try {
        console.log('Portable Identity:', portableIdentity);

        const bearerIdentity1 = await agent.identity.import({ portableIdentity });
        const bearerIdentity2 = await agent.identity.manage({ portableIdentity: portableIdentity });

        // const importedBearerDid = await agent.did.import({ portableDid: stellarPortableDid });
        // var importedDid = await agent.identity.import({ portableIdentity });
        // const importedBearerIdentity = await agent.identity.manage({ portableIdentity: portableIdentity });
        // const importedBearerDid = await agent.identity.manage({ portableDid: stellarPortableDid });
        // console.log('Imported bearer did: ', importedBearerDid);
      } catch (err) {
        console.error(err);
      }

      const list = await agent.identity.list();
      console.log('LIST: ', list);

      // Change the active DID.
      this.identity.did = stellarPortableDid.uri;

      // const password = await this.crypto.createPassword();

      // REUSE PASSWORD ACROSS ALL IDENTITIES!
      const password = this.app.account().password;

      this.app.addAccount({
        did: stellarPortableDid.uri,
        recoveryPhrase: this.addressForm.controls.recoveryPhrase.value!,
        password: password,
        bundleTimestamp: '',
      });

      // this.app.state().selectedAccount = this.identity.did;
      // this.app.saveState();
      // agent.did.dereference({ didUrl: '' });

      this.route.navigate(['/profile', this.identity.did]);

      // var importedDid = await customAgent.identity.import({ portableIdentity });
      // await customAgent.identity.manage({ portableIdentity: portableIdentity });
    } else {
      // Create a unique password for the user that they can replace.
      let password = await this.crypto.createPassword();

      const account: Account = {
        did: '',
        recoveryPhrase: this.addressForm.controls.recoveryPhrase.value!,
        password,
        passwordHash: '',
        bundleTimestamp: '',
      };

      password = '123';

      const result = await this.identity.restore(password, this.addressForm.controls.recoveryPhrase.value!);

      console.log('RESTORE Result: ', result);

      if (!result) {
        alert('Failed to restore account.');
        this.addressForm.enable();
        return;
      }

      account.did = result.did;

      this.app.addAccount(account);
    }

    this.app.initialized.set(true);
    this.app.loading.set(false);
  }
}

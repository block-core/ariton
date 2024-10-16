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
import { BearerIdentity, PortableIdentity } from '@web5/agent';
import { Router, RouterModule } from '@angular/router';
import { ProtocolService } from '../../../protocol.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-restore',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    RouterModule,
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

  protocol = inject(ProtocolService);

  route = inject(Router);

  private identity = inject(IdentityService);

  importedIdentities: BearerIdentity[] = [];

  addressForm = this.fb.group({
    recoveryPhrase: [null, Validators.required],
    importType: ['ariton', Validators.required],
  });

  async editFile(data: any) {
    document.getElementById('input')?.click();
  }

  async onFileSelected(event: any) {
    const files = (event.target as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return;
    }

    console.log('Uploading number of files:', files.length);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async () => {
        const content = reader.result as string;
        try {
          const jsonObject = JSON.parse(content);
          // Process the JSON object
          console.log('Parsed JSON object:', jsonObject);

          const bearerIdentity = await this.identity.activeAgent().identity.manage({ portableIdentity: jsonObject });
          console.log('Imported identity: ', bearerIdentity);

          this.importedIdentities.push(bearerIdentity);

          this.identity.identities = await this.identity.activeAgent().identity.list();
        } catch (error) {
          this.app.openSnackBar(`Error parsing JSON from file ${file.name}: ${error}`, 3000);
          console.error(`Error parsing JSON from file ${file.name}:`, error);
        }
      };

      reader.onerror = () => {
        console.error(`Error reading file ${file.name}:`, reader.error);
      };

      reader.readAsText(file);
    }

    // const files = event.currentTarget.files;

    // if (files.length == 0) {
    //   return;
    // }

    // console.log('Uploading number of files:', files.length);

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   const reader = new FileReader();

    //   reader.onload = (event) => {
    //     try {
    //       const json = JSON.parse(event.target.result as string);
    //       console.log(json);
    //     } catch (error) {
    //       console.error('Error parsing JSON:', error);
    //     }
    //   };

    //   reader.onerror = (error) => {
    //     console.error('Error reading file:', error);
    //   };

    //   reader.readAsText(file);
    // }

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   console.log(file);
    //   const blob = new Blob([file], { type: file.type });

    //   console.log(blob);
    // }

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   console.log(file);
    //   const blob = new Blob([file], { type: file.type });
    //   console.log(blob);
    //   console.log('Parent ID:', this.breadcrumb.parentId);

    //   const query = {
    //     tags: {
    //       name: file.name,
    //       size: file.size,
    //       type: file.type,
    //       lastModified: file.lastModified,
    //       entryType: 'file',
    //     },
    //     protocol: fileDefinition.protocol,
    //     protocolPath: this.protocolPath,
    //     parentContextId: (this.contextId ??= undefined),
    //     schema: fileDefinition.types.entry.schema,
    //     dataFormat: blob.type,
    //   };

    //   console.log(query);

    //   // const file = event.currentTarget.files[0];
    //   const { status: fileStatus, record } = await this.identity.web5.dwn.records.create({
    //     data: blob,
    //     message: query,
    //   });

    //   console.log('Record created:', record);
    //   console.log('Record status:', fileStatus);

    //   // record?.contextId;

    //   // const message = {
    //   //   tags: {
    //   //     type: file.type, // Do we ever need to index and query on file types? Perhaps to find "PDF" files only?
    //   //     entryType: 'file',
    //   //     attachment: record!.id, // Store a reference to download the binary file.
    //   //     root: this.parentId ? false : true,
    //   //   },
    //   //   protocol: fileDefinition.protocol,
    //   //   protocolPath: 'entry',
    //   //   parentContextId: (this.parentId ??= undefined),
    //   //   schema: fileDefinition.types.entry.schema,
    //   // };

    //   // console.log('Data:', data);
    //   // console.log('Message:', message);

    //   // const { status: fileStatus2, record: record2 } = await this.identity.web5.dwn.records.create({
    //   //   data: data,
    //   //   message: message,
    //   // });

    //   // console.log('Record created:', record2);
    //   // console.log('Record status:', fileStatus2);

    //   if (record) {
    //     // const data = await record2.data.blob();
    //     // console.log(data);

    //     this.entries.update((records) => [...records, record]);
    //   }
    // }

    // console.log('File selected:', this.file);
    // console.log('Schema', fileDefinition.types.attachment.schema);
    // console.log(fileDefinition.types.attachment.dataFormats[0]);

    // const imageBlob = new Blob(
    //   [
    //     /* binary image data */
    //   ],
    //   { type: 'image/png' },
    // );

    // console.log(this.file instanceof Blob); // true

    // var file = input.files[0];
    // var reader = new FileReader();
    // reader.addEventListener('load', readFile);
    // reader.readAsText(file);

    // const file = new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' });
    // //or const file = document.querySelector('input[type=file]').files[0];
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
    //   console.log(blob);
    // };
    // reader.readAsArrayBuffer(file);

    // const file = new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' });
    // //or const file = document.querySelector('input[type=file]').files[0];

    // file.arrayBuffer().then((arrayBuffer) => {
    //   const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
    //   console.log(blob);
    // });

    // const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
    // console.log(await fileToBlob(new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' })));

    // let blob = new Blob(await file.arrayBuffer());

    // if (options.data) {
    //   options.dataFormat = options.data.type;
    //   if (options.data instanceof File) {
    //     options.data = new Blob([options.data], { type: options.dataFormat });
    //   }
    // }

    // let record = _record || (await datastore.getProfileImage(type, { from }));
    // let blob = file ? new Blob([file], { type: file.type }) : undefined;

    // return record;

    // if (this.file) {
    //   const fileType = this.file.type;
    //   if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
    //     this.fileError = 'Only PNG or JPG files are allowed';
    //     this.file = null; // Reset the file
    //     this.uploadSuccess = false;
    //   } else {
    //     this.fileError = null;
    //   }
    // }
  }

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

      this.identity.identities = await agent.identity.list();

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

      // After adding account, let's make sure we install the protocols.
      await this.protocol.register();

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

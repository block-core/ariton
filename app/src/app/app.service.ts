import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { CryptoService } from './crypto.service';
import { IdentityService } from './identity.service';
import { Web5ConnectResult } from '@web5/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  initialized = signal<boolean>(false);

  storage = inject(StorageService);

  crypto = inject(CryptoService);

  identity = inject(IdentityService);

  constructor() { }

  async initialize() {
    console.log('Initializing Ariton...');

    let state: any = this.storage.read('state');

    if (!state) {
      state = {
        selectedAccount: ''
      };
    }

    let accounts = this.storage.read('accounts') as any[];

    let result: Web5ConnectResult;

    console.log('Accounts: ', accounts);

    // If there are no accounts, user has not used app before.
    if (!accounts) 
      {
        console.log('No accounts found');
        // Create a unique password for the user that they can replace.
        const password = await this.crypto.createPassword();

        console.log('Password: ', password);

        // Initialize the identity service with the password to create an 
        // initial account.
        result = await this.identity.initialConnect(password);

        // Save the account to storage.
        accounts = [{
          did: result.did,
          recoveryPhrase: result.recoveryPhrase, // TODO: Encrypt this!
          password: password,
        }];

        this.storage.save('accounts', accounts);

        state.selectedAccount = result.did;

        this.storage.save('state', state);
      } else {
        // If there are accounts, select the one from the state.selectedAccount value.
        const account = accounts.find((account: any) => account.did === state.selectedAccount);

        console.log('Previous selected account: ', account);

        result = await this.identity.connect(account.did, account.password);
      }

      console.log('RESULT: ', result);
      
    // let password = this.storage.read('password');

    // // If there are no password, either user has choose to not persist
    // // it or it's the first time the app is being used.
    // if (!password) {
    //   password = await this.crypto.createPassword();
    //   this.storage.save('password', password);
    //   console.log('Password created');
    // }

    this.initialized.set(true);
  }

}

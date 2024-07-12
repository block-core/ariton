import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { CryptoService } from './crypto.service';
import { IdentityService } from './identity.service';
import { Web5ConnectResult } from '@web5/api';
import * as packageInfo from '../../package.json';
import { ProtocolService } from './protocol.service';

export interface AppState {
  selectedAccount: string;
  backupConfirmed?: boolean;
}

export interface Account {
  did: string;
  recoveryPhrase: string;
  password?: string;
  passwordHash?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialized = signal<boolean>(false);

  loading = signal<boolean>(false);

  storage = inject(StorageService);

  crypto = inject(CryptoService);

  identity = inject(IdentityService);

  protocol = inject(ProtocolService);

  state = signal<AppState>({ selectedAccount: '' });

  account = signal<Account>({ did: '', recoveryPhrase: '', password: '', passwordHash: '' });

  accounts = signal<Account[]>([]);

  firstTime = signal<boolean>(false);

  /** Parameters that comes from query string during activation of the extension. */
  params = signal<any>({});

  package = packageInfo;

  dependencies: any;

  constructor() {
    console.log(`Ariton v${this.package.version} initialized.`);
    this.dependencies = Object.entries(this.package.dependencies).map(([key, value]) => ({ name: key, version: value }));
  }

  //getState() {
  //  return this.storage.read('state');
  //}

  saveAccounts() {
    this.storage.save('accounts', this.accounts());
  }

  saveState() {
    this.storage.save('state', this.state());
  }

  // restore(recoveryPhrase: string) {
  //     // Create a unique password for the user that they can replace.
  //     const password = await this.crypto.createPassword();
  //     // this.state().selectedAccount
  // }

  hasStateBeenSet() {
    let state = this.storage.read('state') as AppState;

    if (!state) {
      return false;
    }

    return true;
  }

  addAccount(account: Account) {
    this.accounts().push(account);
    this.saveAccounts();

    this.state().selectedAccount = account.did;
    this.saveState();
  }

  async initialize() {
    this.loading.set(true);
    console.log('Initializing Ariton...');

    let state = this.storage.read('state') as AppState;

    console.log('STATE IS WHAT:', state);

    if (!state) {
      state = {
        selectedAccount: '',
      };

      this.firstTime.set(true);
    }

    let accounts = this.storage.read('accounts') as any[];

    let result: Web5ConnectResult | undefined;

    // console.log('Accounts: ', accounts);

    // If there are no accounts, user has not used app before.
    if (!accounts) {
      console.log('No accounts found');
      // Create a unique password for the user that they can replace.
      const password = await this.crypto.createPassword();

      // Initialize the identity service with the password to create an
      // initial account.
      result = await this.identity.initialConnect(password);

      if (!result) {
        this.loading.set(false);
        return;
      }

      // Save the account to storage.
      accounts = [
        {
          did: result.did,
          recoveryPhrase: result.recoveryPhrase, // TODO: Encrypt this!
          password: password,
        },
      ];

      this.storage.save('accounts', accounts);

      state.selectedAccount = result.did;

      this.accounts.set(accounts);
      this.account?.set(accounts[0]);
      this.storage.save('state', state);
    } else {
      // If there are accounts, select the one from the state.selectedAccount value.
      const account = accounts.find((account: any) => account.did === state.selectedAccount);
      this.accounts.set(accounts);
      this.account?.set(account);

      // console.log('Account found: ', account);

      if (account.password) {
        result = await this.identity.connect(account.did, account.password);
        if (!result) {
          this.loading.set(false);
          return;
        }
      } else {
        // If the account does not have a password, it means the user has not
        // persisted it. We need to ask for the password.
        this.identity.locked.set(true);
      }
    }

    // let password = this.storage.read('password');

    // // If there are no password, either user has choose to not persist
    // // it or it's the first time the app is being used.
    // if (!password) {
    //   password = await this.crypto.createPassword();
    //   this.storage.save('password', password);
    //   console.log('Password created');
    // }

    this.state.set(state);

    this.initialized.set(true);

    this.loading.set(false);

    // When intialization is finished, make sure we always re-register the protocols.
    this.protocol.register();
  }
}

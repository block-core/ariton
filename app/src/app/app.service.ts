import { Injectable, effect, inject, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CryptoService } from './crypto.service';
import { IdentityService } from './identity.service';
import { Web5ConnectResult } from '@web5/api';
import * as packageInfo from '../../package.json';
import { ProtocolService } from './protocol.service';
import { ProfileService } from './profile.service';
import { HashService } from './hash.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from './connection.service';
import { WorkerService } from './worker.service';
import { EventService } from './event.service';
import { StorageService } from './storage.service';

export interface AppState {
  selectedAccount: string;
  backupConfirmed?: boolean;
  hidden: any;
  loginAction: string;
  // bundleHash: string | null;
  // bundleTimestamp: string | null;
}

export interface Account {
  did: string;
  recoveryPhrase: string;
  password?: string;
  passwordHash?: string;
  bundleTimestamp: string | null;
}

export enum OnboardingState {
  Initial = 0,
  NewUser = 1,
  Locked = 2,
  Unlocked = 3,
  Error = 4,
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  /** To keep various UI states in sync, we use onboardingState as the organizing signal.
   * 0 = App Loading
   * 1 = App State Not Set, new user, allow them to create or restore account.
   * 2 = App State Set, user have persisted password, loading them into app.
   * 3 = App State Set, user have set custom password, show unlock dialog.
   */
  onboardingState = signal<OnboardingState>(OnboardingState.Initial);

  initialized = signal<boolean>(false);

  loading = signal<boolean>(false);

  localStorage = inject(LocalStorageService);

  storage = inject(StorageService);

  hash = inject(HashService);

  worker = inject(WorkerService);

  crypto = inject(CryptoService);

  identity = inject(IdentityService);

  profile = inject(ProfileService);

  connection = inject(ConnectionService);

  protocol = inject(ProtocolService);

  snackBar = inject(MatSnackBar);

  event = inject(EventService);

  state = signal<AppState>({ loginAction: '/dashboard', selectedAccount: '', hidden: {} });

  account = signal<Account>({ did: '', recoveryPhrase: '', password: '', passwordHash: '', bundleTimestamp: '' });

  accounts = signal<Account[]>([]);

  /** Parameters that comes from query string during activation of the extension. */
  params = signal<any>({});

  package = packageInfo;

  dependencies: any;

  aritonDid = 'did:dht:mo7am9cz6qrjwoc4kapffeue9kjw6igdh9dmqd3ywdif6qa7ju4o';

  constructor() {
    console.log(`Ariton v${this.package.version} (${this.hash.getTimestamp()})`);

    this.dependencies = Object.entries(this.package.dependencies).map(([key, value]) => ({
      name: key,
      version: value,
    }));

    // Activate all polyfills with default options, and cache every DRL for 1 minute.
    // activatePolyfills({
    //   onCacheCheck(event: any, route: any) {
    //     return {
    //       ttl: 60_000,
    //     };
    //   },
    // });

    effect(async () => {
      // When account is unlocked, either automatically or manually, proceed with the initial load.
      if (!this.identity.locked()) {
        await this.onUnlocked();
      }
    });
  }

  //getState() {
  //  return this.storage.read('state');
  //}

  saveAccounts() {
    this.localStorage.save('accounts', this.accounts());
  }

  saveState() {
    this.localStorage.save('state', this.state());
  }

  // restore(recoveryPhrase: string) {
  //     // Create a unique password for the user that they can replace.
  //     const password = await this.crypto.createPassword();
  //     // this.state().selectedAccount
  // }

  hasStateBeenSet() {
    let state = this.localStorage.read('state') as AppState;

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

  async createAccount() {
    let state: AppState = {
      selectedAccount: '',
      hidden: {},
      loginAction: '/introduction',
      // bundleTimestamp: '',
    };

    this.localStorage.save('state', state);

    await this.initialize();
  }

  openSnackBar(message: string, duration: number = 2000) {
    this.snackBar.open(message, undefined, { duration });
  }

  async initialize() {
    this.loading.set(true);
    console.log('Initializing Ariton...');

    let state = this.localStorage.read('state') as AppState;

    // If there is no state, it's a new user and return immediately.
    if (!state) {
      this.onboardingState.set(OnboardingState.NewUser);
      this.loading.set(false);
      return;
    }

    let accounts = this.localStorage.read('accounts') as any[];
    let result: Web5ConnectResult | undefined;

    // If there are no accounts, user has not used app before.
    if (!accounts) {
      console.log('No accounts found');

      // Create a unique password for the user that they can replace.
      const password = await this.crypto.createPassword();

      // Initialize the identity service with the password to create an
      // initial account.
      result = await this.identity.initialConnect(password);

      if (result === undefined) {
        // If we fail on initial creation, reset the state so user
        // will retry again when online.
        this.localStorage.remove('state');
        this.onboardingState.set(OnboardingState.Error);
        this.loading.set(false);
        return;
      }

      console.log(result);
      console.log('Initialize connect finished.');

      // if (!result) {
      //   // TODO: Handle this error condition.
      //   this.loading.set(false);
      //   return;
      // }

      // Save the account to storage.
      accounts = [
        {
          did: result.did,
          recoveryPhrase: result.recoveryPhrase, // TODO: Encrypt this!
          password: password,
        },
      ];

      this.localStorage.save('accounts', accounts);

      state.selectedAccount = result.did;

      this.accounts.set(accounts);
      this.account?.set(accounts[0]);
      this.localStorage.save('state', state);

      // A new default account is auto-unlocked with a generate password.
      this.onboardingState.set(OnboardingState.Unlocked);

      // The default account is unlocked upon creation, continue the loading process.
      this.identity.locked.set(false);
    } else {
      // If there are accounts, select the one from the state.selectedAccount value.
      const account = accounts.find((account: any) => account.did === state.selectedAccount);
      this.accounts.set(accounts);
      this.account?.set(account);

      // console.log('Account found: ', account);

      if (account.password) {
        result = await this.identity.connect(account.did, account.password);
        if (!result) {
          // TODO: Implement error handling for this case.
          this.loading.set(false);
        } else {
          // Existing account was successfully unlocked.
          this.onboardingState.set(OnboardingState.Unlocked);
          this.identity.locked.set(false);
        }
      } else {
        // If the account does not have a password, it means the user has not
        // persisted it. We need to ask for the password.
        this.identity.locked.set(true);
        this.onboardingState.set(OnboardingState.Locked);
      }
    }

    this.state.set(state);
  }

  async onUnlocked() {
    // let password = this.storage.read('password');

    // // If there are no password, either user has choose to not persist
    // // it or it's the first time the app is being used.
    // if (!password) {
    //   password = await this.crypto.createPassword();
    //   this.storage.save('password', password);
    //   console.log('Password created');
    // }

    // Load the user profile.
    await this.profile.openCurrentUserProfile(this.account().did);

    // Load user and app data.
    await this.loadAppData();

    this.initialized.set(true);

    this.loading.set(false);

    // Start the background worker that will process data in the background.
    this.worker.start();

    // Hook up to handle events from remote and local DWN.
    this.event.initialize();

    this.firstTimeInitialization();
  }

  private async loadAppData() {
    console.log('Loading app data...');
    // Loads the connections and blocks, used by various app and services on Ariton.
    await this.connection.initialize();

    console.log('App data loaded.');
  }

  /** Only run when the hash bundle has changed (updated app) */
  async firstTimeInitialization() {
    // If the previous bundle hash is the same as the current, we don't need to re-register.
    // For local development, the getHash should be null, so we always re-register.
    if (this.hash.getTimestamp() != null && this.account().bundleTimestamp === this.hash.getTimestamp()) {
      console.log('Bundle hash is the same as the previous one. No need to re-register protocols.');
      return;
    } else {
      console.log('Bundle hash is different from the previous one. Re-registering protocols...');
    }

    // When intialization is finished, make sure we always re-register the protocols.
    console.log(`Register protocols for ${this.identity.did}`);
    this.protocol.register(this.identity.web5);

    // Save the current bundle hash to the state.
    // this.state().bundleTimestamp = this.hash.getTimestamp();
    this.account().bundleTimestamp = this.hash.getTimestamp();
    this.saveAccounts();
    // this.saveState();
  }
}

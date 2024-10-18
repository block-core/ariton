import { Injectable, WritableSignal, signal } from '@angular/core';
import { Web5 } from '@web5/api';
import { DidDht, DidJwk } from '@web5/dids';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { CryptoService } from './crypto.service';
import {
  AgentDidApi,
  AgentDidResolverCache,
  BearerIdentity,
  DwnDidStore,
  HdIdentityVault,
  isPortableIdentity,
  Web5PlatformAgent,
  PortableIdentity,
  AgentIdentityApi,
  DwnIdentityStore,
  AgentKeyManager,
} from '@web5/agent';
import { Web5UserAgent } from '@web5/user-agent';
import { LevelStore } from '@web5/common';
import { DidStellar } from '../crypto/methods/did-stellar';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  syncInterval = '15s';
  //agents = signal<Web5IdentityAgent[]>([]);

  agents: WritableSignal<Web5IdentityAgent[]> = signal([]);

  constructor(private cryptoService: CryptoService) {
    /*
    Web5.connect({ sync: this.syncInterval }).then((res) => {
      this.did = res.did;
      this.web5 = res.web5;

      const recoveryPhrase = res.recoveryPhrase;

      if (recoveryPhrase) {
        // Show recovery phrase
        console.log(recoveryPhrase);



      }

      console.log(this.did);
      console.log(this.web5);

      this.initialized.set(true);
      this.locked.set(false);
    }).catch((err) => {
      console.error(err);
      console.log('Show unlock screen!');
      this.locked.set(true);
    });*/
  }

  async initialConnect(password: string) {
    try {
      console.log('Connecting to Web5...');
      const result = await Web5.connect({
        // didCreateOptions: { dwnEndpoints: ['https://dwn.gcda.xyz', 'https://dwn.tbddev.org/beta'] },
        // didCreateOptions: { dwnEndpoints: ['https://dwn.tbddev.org/beta'] },
        password,
        sync: this.syncInterval,
      });
      this.web5 = result.web5;
      this.did = result.did;

      console.log('Web5 Connected.', this.did);
      // console.log('IDENTITY SERVICE:', this.web5);

      const agent = this.web5.agent as Web5IdentityAgent;
      this.identities = await agent.identity.list();
      console.log('LIST OF ALL IDENTITIES: ', this.identities);

      this.preinitialized.set(true);
      this.initialized.set(true);
      return result;
    } catch (err) {
      // Various network connection issues might make this call fail.
      console.error(err);
    }

    return undefined;
  }

  identities: BearerIdentity[] = [];

  /** This is the root and only agent for the user. */
  agent!: Web5IdentityAgent;

  // accounts: Web5[] = [];

  accounts: { [key: string]: Web5 } = {};

  store!: DwnIdentityStore;

  identityApi!: AgentIdentityApi;

  async connect(connectedDid: string, password: string) {
    try {
      const customAgentVault = new HdIdentityVault({
        keyDerivationWorkFactor: 210_000,
        store: new LevelStore<string, string>({ location: `DATA/AGENT/VAULT_STORE` }),
      });

      await customAgentVault.unlock({ password });

      const didApi = new AgentDidApi({
        didMethods: [DidDht, DidJwk, DidStellar],
        resolverCache: new AgentDidResolverCache({ location: `DATA/AGENT/DID_RESOLVERCACHE` }),
        store: new DwnDidStore(),
      });

      const agentDid = await customAgentVault.getDid();

      this.store = new DwnIdentityStore();

      const identityApi: any = new AgentIdentityApi({ store: this.store });
      this.identityApi = identityApi;

      const customAgent = await Web5IdentityAgent.create({
        didApi,
        agentDid,
        identityApi,
        agentVault: customAgentVault,
      });
      this.agent = customAgent;

      console.log('Connecting to Web5...');

      const result = await Web5.connect({ agent: customAgent, connectedDid, password, sync: this.syncInterval });

      // Populate the accounts array with the connected accounts.
      this.accounts[connectedDid] = result.web5;

      // const result = await Web5.connect({ connectedDid, password, sync: this.syncInterval });

      // const list = await customAgent.identity.list();
      // console.log('LIST: ', list);

      this.web5 = result.web5;
      this.did = result.did;

      // const resolvedDid = await this.web5.did.resolve(
      //   'did:stellar:GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
      // );

      // console.log('Resolved DID:', resolvedDid);

      // const stellarBearerDid = await DidStellar.fromPrivateKey({
      //   privateKey: 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7',
      // });

      // console.log('DID from key: ', stellarBearerDid);

      // const stellarPortableDid = await stellarBearerDid.export();

      // try {
      //   const bearerDid = await customAgent.did.import({ portableDid: stellarPortableDid });

      //   console.log('Imported bearer did: ', bearerDid);
      // } catch (err) {
      //   console.warn('Failed to import bearer DID, likely because of duplicate:', err);
      // }

      // const portableIdentity: PortableIdentity = {
      //   portableDid: stellarPortableDid,
      //   metadata: {
      //     name: 'Stellar Identity',
      //     tenant: stellarPortableDid.uri,
      //     uri: stellarPortableDid.uri,
      //     // uri: 'urn:jwk:rTKi_NGEHUMnhVhHyt2Hvxf8dObcImzVVNLB3xyroFo',
      //     // connectedDid: ''
      //   },
      // };

      // console.log('Portable Identity:', portableIdentity);

      // // PortableIdentity did = new PortableIdentity

      // try {
      //   // Delete first.
      //   // await customAgent.did.delete({ didUri: portableIdentity.metadata.uri });

      //   var importedDid = await customAgent.identity.import({ portableIdentity });
      //   await customAgent.identity.manage({ portableIdentity: portableIdentity });

      //   console.log('Imported DID:', importedDid);
      // } catch (err) {
      //   console.warn('Failed to import bearer DID, likely because of duplicate:', err);
      // }

      // const list = await customAgent.identity.list();
      // console.log('LIST: ', list);

      // const retrievedDid = await customAgent.did.get({ didUri: portableIdentity.metadata.uri });
      // console.log('Retrieved DID:', retrievedDid);

      // try {
      //   await customAgent.identity.manage({ portableIdentity: portableIdentity });
      // } catch (err) {
      //   console.warn('Failed to manage identity:', err);
      // }

      //  const storedDid = await this.agent.did.import({
      //    portableDid: portableIdentity.portableDid,
      //    tenant: portableIdentity.metadata.tenant,
      //  });

      //     isPortableIdentity

      //     customAgent.identity.manage().create({ didMethod: 'stellar' });

      // await customAgent.identity.manage({ portableIdentity: stellarPortableDid });

      // const dhtDid = await DidDht.create({ options: { publish: false } });

      // DidDht.import(dhtDid);

      // customAgent.identity.import()

      // const agent = result.web5.agent as Web5PlatformAgent;
      // const identites = await agent.identity.list();
      // console.log('Identites:', identites);
      // const agent = this.web5.agent as Web5IdentityAgent;
      // const list = await agent.identity.list();
      // console.log('LIST: ', list);

      console.log('Web5 Connected.');

      this.preinitialized.set(true);
      this.initialized.set(true);

      // Start initializing additional Web5 instances for all the identities the user has. Do this in the background.
      this.loadAccounts(password);

      return result;
    } catch (err) {
      // TODO: Add UI and retry for Web5 initialize, add proper error handling.
      // Various network connection issues might make this call fail.@
      console.error(err);
      alert('Failed to initialize Web5:' + err);
    }

    return undefined;
  }

  async changeAccount(did: string) {
    const account = this.accounts[did];

    if (!account) {
      return;
    }

    this.web5 = account;
    this.did = did;
  }

  async loadAccounts(password: string) {
    this.identities = await this.agent.identity.list();
    console.log('LIST OF ALL IDENTITIES: ', this.identities);

    for (const identity of this.identities) {
      const uri = identity?.metadata?.uri;
      await this.registerAccount(uri, password);
    }
  }

  async registerAccount(uri: string, password: string) {
    let account = this.accounts[uri];

    if (account) {
      return;
    }

    const { web5 } = await Web5.connect({
      agent: this.agent,
      connectedDid: uri,
      password,
      sync: this.syncInterval,
    });

    this.accounts[uri] = web5;

    try {
      await this.agent.sync.registerIdentity({ did: uri });
    } catch (err) {
      console.warn('Failed to register sync for account:', err);
    }
  }

  async restore(password: string, recoveryPhrase: string) {
    try {
      console.log('Connecting to Web5...');
      const result = await Web5.connect({ recoveryPhrase, password, sync: this.syncInterval });
      this.web5 = result.web5;
      this.did = result.did;

      console.log('Web5 Connected.');
      this.preinitialized.set(true);
      this.initialized.set(true);
      return result;
    } catch (err) {
      // TODO: Add UI and retry for Web5 initialize, add proper error handling.
      // Various network connection issues might make this call fail.@
      alert('Failed to initialize Web5');
    }

    return undefined;
  }

  activeAgent() {
    const agent = this.web5.agent as Web5IdentityAgent;
    return agent;
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const agent = this.web5.agent as Web5IdentityAgent;
    await agent.vault.changePassword({ oldPassword, newPassword });
  }

  async lock() {
    // TODO: Validate if we need to do more when locking the account.
    console.log('Locking account...');

    const agent = this.web5.agent as Web5IdentityAgent;
    await agent.vault.lock();

    console.log('Vault locked');

    this.locked.set(true);
  }

  async unlock(password: string) {
    try {
      console.log('Connecting to Web5...');
      const { did: userDid, web5, recoveryPhrase } = await Web5.connect({ sync: this.syncInterval, password });

      if (recoveryPhrase) {
      }

      this.did = userDid;
      this.web5 = web5;

      this.initialized.set(true);
      this.locked.set(false);

      return true;
    } catch (error) {
      console.error(error);
      console.log('Show unlock screen!');
      this.locked.set(true);
      return false;
    }
  }

  // async initialize(password: string, recoveryPhrase: string, path: string) {
  //     const agent = await Web5IdentityAgent.create({ dataPath: path });

  //     if (await agent.firstLaunch()) {
  //         recoveryPhrase = await agent.initialize({ password, recoveryPhrase });
  //     }

  //     this.agents.update((values) => [...values, agent]);

  //     /*this.agents.update((arr: Web5IdentityAgent[]) => {
  //   arr.push(agent);
  //   return arr;
  // });*/
  // }

  preinitialized = signal<boolean>(false);

  initialized = signal<boolean>(false);

  // Locked should initially be true.
  locked = signal<boolean>(true);

  web5!: Web5;

  did!: string;

  // async create() {
  //     // Creates a DID using the DHT method and publishes the DID Document to the DHT
  //     const didDht = await DidDht.create({ options: { publish: false } });

  //     return didDht;
  // }
}

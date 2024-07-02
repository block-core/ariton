import { Injectable, WritableSignal, signal } from '@angular/core';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  syncInterval = '10s';
  //agents = signal<Web5IdentityAgent[]>([]);

  agents: WritableSignal<Web5IdentityAgent[]> = signal([]);

  constructor(private cryptoService: CryptoService) {

    console.log('Connecting to Web5...');
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
    const result = await Web5.connect({password,  sync: this.syncInterval });
    this.web5 = result.web5;
    this.did = result.did;

    console.log('IDENTITY SERVICE:', this.web5);

    this.initialized.set(true);
    return result;
  }

  async connect(connectedDid: string, password: string) {
    const result = await Web5.connect({ connectedDid ,password,  sync: this.syncInterval });
    this.web5 = result.web5;
    this.did = result.did;

    console.log('IDENTITY SERVICE:', this.web5);

    this.initialized.set(true);
    return result;
  }

  activeAgent() {
    const agent = this.web5.agent as Web5IdentityAgent;
    return agent;
  }

  async changePassword(oldPassword: string, newPassword: string) {
    console.log(this);
    console.log(this.web5);
    debugger;

    const agent = this.web5.agent as Web5IdentityAgent;
    await agent.vault.changePassword({ oldPassword, newPassword });
  }

  async unlock(password: string) {
    console.log('Connecting to Web5...');
    
    try {
      const {did: userDid, web5, recoveryPhrase } = await Web5.connect({ sync: '5s', password });


      if (recoveryPhrase)
        {



        }

      this.did = userDid;
      this.web5 = web5;

      console.log(this.did);
      console.log(this.web5);

      this.initialized.set(true);
      this.locked.set(false);
      
      return true;
    }
    catch (error) {
      console.error(error);
      console.log('Show unlock screen!');
      this.locked.set(true);
      return false;
    }
  }

  async initialize(password: string, recoveryPhrase: string, path: string) {
    const agent = await Web5IdentityAgent.create({ dataPath: path });

    if (await agent.firstLaunch()) {
      recoveryPhrase = await agent.initialize({ password, recoveryPhrase });
    }

    this.agents.update(values => [...values, agent]);

    /*this.agents.update((arr: Web5IdentityAgent[]) => {
      arr.push(agent);
      return arr;
    });*/


  }

  initialized = signal<boolean>(false);

  locked = signal<boolean>(false);

  web5!: Web5;

  did!: string;

  async create() {
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    const didDht = await DidDht.create({ options: { publish: false } });

    return didDht;
  }
}

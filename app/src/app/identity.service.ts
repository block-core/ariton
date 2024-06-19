import { Injectable, signal } from '@angular/core';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor() {
    console.log('Connecting to Web5...');
    Web5.connect({ sync: '5s' }).then((res) => {
      this.did = res.did;
      this.web5 = res.web5;

      console.log(this.did);
      console.log(this.web5);

      this.initialized.set(true);
    });
  }

  initialized = signal<boolean>(false);

  web5!: Web5;

  did!: string;

  async create() {
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    const didDht = await DidDht.create({ options: { publish: false } });

    return didDht;
  }
}

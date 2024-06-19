import { Injectable } from '@angular/core';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids'

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor() {
    console.log('Connecting to Web5...');
    Web5.connect().then((res) => {
      this.did = res.did;
      this.web5 = res.web5;

      console.log(this.did);
      console.log(this.web5);
    });
  }

  web5: Web5 | undefined;

  did: string | undefined;

  async create() {
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    const didDht = await DidDht.create({ options: { publish: false } });

    return didDht;
  }
}

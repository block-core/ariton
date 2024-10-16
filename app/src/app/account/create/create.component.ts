import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { AppService } from '../../app.service';
import { DidCreateVerificationMethod, DidDht, DidJwk, DidKey } from '@web5/dids';
import { DidStellar } from '../../../crypto/methods/did-stellar';
import { StrKey } from '../../../crypto/methods/strkey';
import { Ed25519 } from '@web5/crypto';
import { Web5 } from '@web5/api';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { AgentDidApi } from '@web5/agent';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  layout = inject(LayoutService);

  app = inject(AppService);

  constructor() {
    this.layout.marginOn();

    effect(async () => {
      if (this.app.initialized()) {
        const privateKeyText = 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7';
        const publicKeyText = 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB';

        // const didApi = new AgentDidApi({
        //   didMethods: [DidDht, DidJwk],
        //   // resolverCache: new DidResolverCacheMemory(),
        //   // store: new DwnDidStore(),
        // });

        // const agent = await Web5IdentityAgent.create({ didApi });
        // const web5 = await Web5.connect({ agent });

        // console.log('Agent: ', agent);
        // console.log('Web5: ', web5);

        // import { Web5IdentityAgent } from '@web5/identity-agent'

        // // Create a Web5 Identity Agent instance.
        // const agent = await Web5IdentityAgent.create();

        //         // Instantiate DID API with an in-memory resolver cache.
        // const didApi = new AgentDidApi({
        //   didMethods: [DidDht, DidJwk],
        //   resolverCache: new DidResolverCacheMemory(),
        //   store: new DwnDidStore(),
        // });

        // // Create a Web5 Identity Agent instance.
        // const agent = await Web5IdentityAgent.create({ agentVault, didApi });

        //         Web5.connect({
        //           agent:
        //         })

        //         const agent = this.app.identity.activeAgent();
        //         agent.identity.create({ method: 'stellar' });

        //             const didApi = new AgentDidApi({
        //               agent: agent,
        //               didMethods: [DidDht, DidJwk],
        //               resolverCache: didResolverCache,
        //               store: didStore,
        //             });

        //             didApi ??= new AgentDidApi({
        //               didMethods: [DidDht, DidJwk],
        //               resolverCache: new DidResolverCacheLevel({ location: `${dataPath}/DID_RESOLVERCACHE` }),
        //               store: new DwnDidStore(),
        //             });

        // const did = DidStellar.fromPrivateKey({
        //   privateKey: 'SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7',
        // });
        // console.log('DID', did);

        // const privateKeyArray = StrKey.decodeEd25519SecretSeed(privateKeyText);

        // // Convert private key from bytes to JWK format.
        // const privateKeyJwk = await Ed25519.bytesToPrivateKey({ privateKeyBytes: privateKeyArray });
        // console.log('privateKeyJwk', privateKeyJwk);

        // const publicKeyJwk = await Ed25519.getPublicKey({ key: privateKeyJwk });
        // console.log('publicKeyJwk', publicKeyJwk);

        // const publicKeyBytes = await Ed25519.publicKeyToBytes({
        //   publicKey: publicKeyJwk,
        // });

        // const identifier = StrKey.encodeEd25519PublicKey(publicKeyBytes);

        // // Use the Stellar identifier as the key ID.
        // privateKeyJwk.kid = identifier;

        // debugger;

        // const importedDid = await DidStellar.fromKeys({ privateKey: privateKeyJwk });

        // console.log(importedDid);

        // DidStellar.fromKeys({ privateKey: privateKeyJwk });

        // const uri1 = await manager.getKeyUri({ key: privateKeyJwk });

        // const didKey = await DidKey.create({ options: { algorithm: 'Ed25519' } });
        // console.log('didKey: ', didKey);
        // const didResult2 = await agent.did.import({ portableDid: portableDid });
        // console.log('didResult2: ', didResult2);

        // const verificationMethods: DidCreateVerificationMethod<TKms> = [{
        //   publicKeyJwk: null,
        //   privateKeyJwk: null
        // }];

        // const verificationMethods: DidCreateVerificationMethod<any>[] = [
        //   {

        //     publicKeyJwk: null,
        //     privateKeyJwk: null
        //   }
        // ];

        // If no verification methods were specified, generate a default Ed25519 verification method.
        // const defaultVerificationMethod: DidCreateVerificationMethod<TKms> = {
        //   algorithm : 'Ed25519' as any,
        //   purposes  : ['authentication', 'assertionMethod', 'capabilityDelegation', 'capabilityInvocation']
        //     };

        //       const verificationMethod: DidCreateVerificationMethod = {
        //   algorithm: 'Ed25519',
        //   controller: 'did:example:1234',
        //   purposes: ['authentication', 'assertionMethod']
        // };

        // const verificationMethodsToAdd: DidIonVerificationMethod[] = [];

        // const result = await DidStellar.create({ options: { verificationMethods:  } });

        // const did = await DidStellar.fromKeys({ verificationMethods });

        // const didDocument = await DidStellar.create({ didUri, options });

        // const didStellar = await DidStellar.console.log('didStellar: ', didStellar);
        // const portableStellarDid = await didStellar.export();
        // console.log(portableStellarDid);

        // DidJwk.

        // const did2 = await DidJwk.from.fromKeyManager({
        //   didUri: 'did:jwk:eyJrIjoiT0tQIiwidCI6IkV1c2UyNTYifQ',
        //   keyManager,
        // });

        // // Instantiate a DID object from an existing verification method key
        // const did = await DidJwk.fromKeys({
        //   verificationMethods: [
        //     {
        //       publicKeyJwk: {
        //         kty: 'OKP',
        //         crv: 'Ed25519',
        //         x: 'cHs7YMLQ3gCWjkacMURBsnEJBcEsvlsE5DfnsfTNDP4',
        //       },
        //       privateKeyJwk: {
        //         kty: 'OKP',
        //         crv: 'Ed25519',
        //         x: 'cHs7YMLQ3gCWjkacMURBsnEJBcEsvlsE5DfnsfTNDP4',
        //         d: 'bdcGE4KzEaekOwoa-ee3gAm1a991WvNj_Eq3WKyqTnE',
        //       },
        //     },
        //   ],
        // });

        return;

        // const agent = this.app.identity.activeAgent();

        // const did = await agent.did.create({ method: 'dht', options: { publish: true } });

        // console.log('Portable DID: ', did);

        // console.log(this.app.identity.activeAgent());

        // const didDht = await DidDht.create({ keyManager: agent.keyManager, options: { publish: true } });
        // const didDhtPortable = await didDht.export();

        // console.log('didDhtPortable: ', didDhtPortable);

        // // const didResult = await agent.did.import({ portableDid: didDhtPortable });

        // //Creates a DID using the did:jwk method
        // const didJwk = await DidJwk.create();

        // //DID and its associated data which can be exported and used in different contexts/apps
        // const portableDid = await didJwk.export();

        // console.log('Portable DID: ', portableDid);

        // const didResult = await agent.did.import({ portableDid: portableDid });

        // const didKey = await DidKey.create({ options: { algorithm: 'Ed25519' } });
        // console.log('didKey: ', didKey);
        // // const didResult2 = await agent.did.import({ portableDid: portableDid });
        // // console.log('didResult2: ', didResult2);

        // const didStellar = await DidStellar.create({ options: { algorithm: 'Ed25519' } });
        // console.log('didStellar: ', didStellar);
        // const portableStellarDid = await didStellar.export();
        // console.log(portableStellarDid);
      }
    });
  }
}

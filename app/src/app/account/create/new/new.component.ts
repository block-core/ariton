import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { Web5 } from '@web5/api';
import { IdentityService } from '../../../identity.service';
import { BearerDid, DidDht, DidService } from '@web5/dids';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { ProtocolService } from '../../../protocol.service';

@Component({
  selector: 'app-new',
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
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  protocol = inject(ProtocolService);

  app = inject(AppService);

  router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor() {}

  ngOnInit() {}

  async onSubmit() {
    this.form.disable();

    console.log('Creating account...');
    const agent = this.identity.activeAgent();

    // TODO: Create a service to manage DWN endpoints for end users,
    // and perhaps have a selection where user can choose which DWN to use
    // for their new account.
    // const services: DidService[] = [
    //   {
    //     id: 'dwn',
    //     type: 'DecentralizedWebNode',
    //     serviceEndpoint: ['https://dwn.tbddev.org/beta'],
    //     enc: '#0',
    //     sig: '#0',
    //   },
    // ];

    const services = [
      {
        id: 'dwn',
        type: 'DecentralizedWebNode',
        serviceEndpoint: ['https://dwn.tbddev.org/beta'],
        enc: '#enc',
        sig: '#sig',
      },
    ];

    const verificationMethods: any = [
      {
        algorithm: 'Ed25519',
        id: 'sig',
        purposes: ['assertionMethod', 'authentication'],
      },
      {
        algorithm: 'secp256k1',
        id: 'enc',
        purposes: ['keyAgreement'],
      },
    ];

    // const did = await DidDht.create({
    //   options: { services, verificationMethods },
    // });

    // const didExport = await did.export();

    // let agentDid = await BearerDid.import({ portableDid: didExport });

    // const agent = (DWeb.agent = await Web5UserAgent.create({ agentDid }));
    // agent.sync.startSync({ interval: options.syncInterval || '2m' }).catch((error) => {
    //   console.error(`Sync failed: ${error}`);
    // });

    const bearerIdentity = await agent.identity.create({
      didOptions: { publish: true, services, verificationMethods: verificationMethods },
      metadata: { name: this.form.controls.name.value! },
    });

    console.log('Export...', bearerIdentity);
    const portableIdentity = await bearerIdentity.export();

    // console.log('Import...');
    // const bearerIdentity1 = await agent.identity.import({ portableIdentity });

    // Register the Web5 instance.
    const web5 = await this.identity.registerAccount(portableIdentity.metadata.uri, this.app.account().password!);

    const newAgent = web5.agent as Web5IdentityAgent;

    // Register the endpoints.
    console.log('Registering DWN endpoints...');

    // const dwnEndpoints = services.map((service) => service.serviceEndpoint[0].toString());
    const dwnEndpoints = ['https://dwn.tbddev.org/beta'];
    await this.identity.registerEndpoints(newAgent, bearerIdentity, dwnEndpoints);
    console.log(`Register protocols for ${portableIdentity.metadata.uri}`);

    // Install all the protocols.
    await this.protocol.register(web5);

    // Change the active account.
    await this.identity.changeAccount(portableIdentity.metadata.uri);

    this.router.navigate(['/accounts']);

    // const DidDht.create();

    //  const res = await Web5.connect({ sync: '5s' });

    //console.log('Web5 Connect:', res.did);
    //console.log('Web5 Connect:', res.web5.agent.agentDid.document.id);
    /*
    Web5IdentityAgent.create({ agentDid

    
*/
    //const agent = await Web5IdentityAgent.create();
    // const password = 'insecure-static-phrase';

    // const recoveryPhrase1 = 'rubber fresh pluck lion upper length scene spawn fruit place spin glare';
    // const recoveryPhrase2 = 'pistol base actress injury barely ivory poet happy raise tell idea summer';
    // const recoveryPhrase3 = 'stool trap result elevator pass safe tourist planet ranch black satoshi text';

    // console.log('Creating agents...');

    // const { web5, did: userDid } = await Web5.connect({ sync: '15s', recoveryPhrase: recoveryPhrase1 });

    // console.log(userDid);
    // console.log(web5);

    // const agentDidExported = await web5.agent.agentDid.export();
    // console.log(agentDidExported);

    // const agent = web5.agent as Web5IdentityAgent;

    // const list = await agent.identity.list();

    // console.log(list);
    // const did = list[0];

    // console.log(did.metadata);
    // did.metadata.name = 'John Doe';
    // const portableDid = await did.export();

    // console.log('DIDS:');
    // console.log(portableDid);
    // //console.log(JSON.stringify(portableDid));

    // const portableAgentDid = await agent.agentDid.export();
    // console.log(portableAgentDid);
    // //const didExported = await web5.agent.

    // console.log(JSON.stringify(portableDid.portableDid));
    // console.log(JSON.stringify(portableAgentDid));

    // // await this.identityService.initialize(password, recoveryPhrase1, 'DATA/AGENT1');
    // // await this.identityService.initialize(password, recoveryPhrase2, 'DATA/AGENT2');
    // //await this.identityService.initialize(password, recoveryPhrase3, 'DATA/AGENT3');

    // console.log('Agents created.');
    // console.log(this.identityService.agents());

    // console.log(await this.identityService.agents()[0].identity.list());
    // console.log(await this.identityService.agents()[1].identity.list());

    /*
    let recoveryPhrase = undefined;

    if (await agent.firstLaunch()) {
      recoveryPhrase = await agent.initialize({ password, recoveryPhrase });
      console.log(recoveryPhrase);
    }

    await agent.start({ password });

    console.log('Agent DID:', agent.agentDid.document.id);

    const identities = await agent.identity.list();
    console.log(identities);
    */
    //await agent.identity.manage({ portableIdentity: await identity.export() });
  }
}

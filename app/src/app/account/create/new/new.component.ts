import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { Web5 } from '@web5/api';
import { IdentityService } from '../../../identity.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  constructor(private identityService: IdentityService) {}

  ngOnInit() {}

  async createAccount() {
    //  const res = await Web5.connect({ sync: '5s' });

    //console.log('Web5 Connect:', res.did);
    //console.log('Web5 Connect:', res.web5.agent.agentDid.document.id);
    /*
    Web5IdentityAgent.create({ agentDid

    
*/
    //const agent = await Web5IdentityAgent.create();
    const password = 'insecure-static-phrase';

    const recoveryPhrase1 = 'rubber fresh pluck lion upper length scene spawn fruit place spin glare';
    const recoveryPhrase2 = 'pistol base actress injury barely ivory poet happy raise tell idea summer';
    const recoveryPhrase3 = 'stool trap result elevator pass safe tourist planet ranch black satoshi text';

    console.log('Creating agents...');

    const { web5, did: userDid } = await Web5.connect({ sync: '5s', recoveryPhrase: recoveryPhrase1 });

    console.log(userDid);
    console.log(web5);

    const agentDidExported = await web5.agent.agentDid.export();
    console.log(agentDidExported);

    const agent = web5.agent as Web5IdentityAgent;

    const list = await agent.identity.list();

    console.log(list);
    const did = list[0];

    console.log(did.metadata);
    did.metadata.name = 'John Doe';
    const portableDid = await did.export();

    console.log('DIDS:');
    console.log(portableDid);
    //console.log(JSON.stringify(portableDid));

    const portableAgentDid = await agent.agentDid.export();
    console.log(portableAgentDid);
    //const didExported = await web5.agent.

    console.log(JSON.stringify(portableDid.portableDid));
    console.log(JSON.stringify(portableAgentDid));

    // await this.identityService.initialize(password, recoveryPhrase1, 'DATA/AGENT1');
    // await this.identityService.initialize(password, recoveryPhrase2, 'DATA/AGENT2');
    //await this.identityService.initialize(password, recoveryPhrase3, 'DATA/AGENT3');

    console.log('Agents created.');
    console.log(this.identityService.agents());

    console.log(await this.identityService.agents()[0].identity.list());
    console.log(await this.identityService.agents()[1].identity.list());

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

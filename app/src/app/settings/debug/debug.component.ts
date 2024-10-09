import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IdentityService } from '../../identity.service';
import { Web5 } from '@web5/api';
import { Web5IdentityAgent } from '@web5/identity-agent';
import { HdIdentityVault } from '@web5/agent';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent {
  query: string = `{
      "data": {},
      "message": {
        "tags": { "role": true },
        "recipient": "did:dht:9omof8aypjcx33rkuk9akug8j7sr4n7u4s69c1hxj8ocmwj8pf1y",
        "protocol": "https://schema.ariton.app/note",
        "protocolPath": "collaborator",
        "schema": "https://schema.ariton.app/note/schema/collaborator",
        "dataFormat": "application/json"
      }
    }`;

  result: string = '';

  status: string = '';

  identity = inject(IdentityService);

  instances = [];

  syncInterval = '15s';

  async createInstance(num: number) {
    const password = 'password' + num;

    // const path = 'DATA/AGENT1';
    // const agent = await Web5IdentityAgent.create({ dataPath: path });

    const result = await Web5.connect({
      password,
      sync: this.syncInterval,
    });

    console.log('Web5 Connected.', result.did);
    console.log('Delegated DID: ', result.delegateDid);
    console.log('Recovery Phrase: ', result.recoveryPhrase);
    console.log('AgentDID: ', result.web5.agent.agentDid.uri);
    console.log('AgentDID metadata: ', result.web5.agent.agentDid.metadata);
    console.log('AgentDID document.id: ', result.web5.agent.agentDid.document.id);

    const agentDidExport = await result.web5.agent.agentDid.export();

    console.log('Agent DID export:', agentDidExport);

    const agent = result.web5.agent as Web5IdentityAgent;
    const backup = await agent.vault.backup();
    console.log('Backup:', backup);

    const status = await agent.vault.getStatus();
    console.log('Vault Status:', status);

    const options1 = await agent.sync.getIdentityOptions(result.did);
    console.log('Identity Options:', options1);

    await agent.vault.restore({ backup: backup, password: password });

    const options2 = await agent.sync.getIdentityOptions(result.did);
    console.log('Identity Options2:', options2);

    const identities = await agent.identity.list();
    console.log('Identities:', identities);

    const identity = identities[0];
    const exportedIdentity = await identity.export();
    console.log('Exported Identity:', exportedIdentity);

    // await agent.identity.delete({ didUri: result.did });

    const portableUserDid = await agent.identity.export({ didUri: result.did });
    console.log('Portable User DID:', portableUserDid);

    // await agent.did.import({ portableDid: portableUserDid.portableDid });
  }

  async restoreAgent(num: number) {
    const password = 'password' + num;

    // const path = 'DATA/AGENT1';
    // const agent = await Web5IdentityAgent.create({ dataPath: path });

    const result = await Web5.connect({
      password,
      sync: this.syncInterval,
    });

    console.log('Web5 Connected.', result.did);
    console.log('Delegated DID: ', result.delegateDid);
    console.log('Recovery Phrase: ', result.recoveryPhrase);
    console.log('AgentDID: ', result.web5.agent.agentDid.uri);
    console.log('AgentDID metadata: ', result.web5.agent.agentDid.metadata);
    console.log('AgentDID document.id: ', result.web5.agent.agentDid.document.id);

    const agentDidExport = await result.web5.agent.agentDid.export();

    console.log('Agent DID export:', agentDidExport);

    const agent = result.web5.agent as Web5IdentityAgent;
    const backup = await agent.vault.backup();
    console.log('Backup:', backup);

    const status = await agent.vault.getStatus();
    console.log('Vault Status:', status);

    const options1 = await agent.sync.getIdentityOptions(result.did);
    console.log('Identity Options:', options1);

    backup.data =
      'eyJkaWQiOiJleUpoYkdjaU9pSmthWElpTENKbGJtTWlPaUpCTWpVMlIwTk5JaXdpWTNSNUlqb2lhbk52YmlKOS4uemN4bElRQzlEWWZ0V2kydy53R2FtWnVILXE3cUNTYUs4UkxiQ05XdHAtVnFoQjRfTmczXzY2Zl9zYWlVeW9ZUHI2d3R2SkdXY25yd1dud1ZJYkdlamhDVnRrTWlkLUplakVHVE9zeXpMQmJZWXc0LW5IUUlGOTZreHVYSkF3cmRRc0o4cUJ0U3NJakhXQmJySUpFbnVkNE95UkQtUzlCWDFvZ0l0ak1GQmlwZy05N3BBMktxbnhMV2tKejBIcXZBVDNhdVhpbS04clZZNmlSNU93Q0pXb19EMjhhbFI5Si1ZNTBmTGVjWE1nZ0ZqMmp6dkc4Q3EzbUhyMklHSDJFbW1OemV5b05hT2xBV2ZHU1N3Sk1WYS1rcThMYTBRWUxieHZnNExjUjU3cVg3dFpRS3hQZTl1ZEdsandybXBtcXdFMXAwM2luUzJxelZLeTNyUGV0QzB4bWp5RE9meDdPM2NmNl80LXpmRXg4X2VkWkRoaExuTjN2N3pxak9ycl9JczVYcHZLc1NvMC1EU3lYdExfQXpNUzRuOXFPb1V5M044aDIxN01sRkJ0Ukd2TGJDaE12RlhkMy1ENEZsd0dvTktCd0xDX3F3RXNfMmt0U1VKdGNEX20yYzVkNENxSW1fSVFjUGtKQ2J6N3lUellUUjdrV1g2S2otU21ldXF0OVFvRG1BeEkxbVV1T0o4Y0pSN1VUSHpyOTJBY09HaVVJdTlTT2Nzbm4ta2JmRTl2U3FVVnZfcTNqcDEza3ptMnBrZWoyTmNnUnVRTnhqYy1DUVFINmVJeHh1SWRPTmF2UjZrWjJ5TFFKZkhFb1BXZXNtQ2dNY1NWR1RiaUp5MWFtWDJjeXI4NnZWaDJTemdwTjhzbmJJaF96MXdFZkRCWC15SFI4cjBQMHJFVG1DVXBoanExd0JISGVTeWVsUEVVakczLXNTZTVIMlQxc0EzVFJiUDczcWZhNktSa0tseVdCb0F6d0ZkcGRBWGVtTVhNNTlwOGlqU0ttYXVSZmZSQTJhZkJDS2FEYnFzX01QdjNGM0h1d2Ixb0x3UG0yOWNCNVJUVGRldU9yWG5rX1RjQVVPOFhSLWxLR19KYlFsc1d4NGlfMV9oVFpPZ3c1bjZfSmFZTUEtZl9wTEpRY0hLREFPeEJBLUowNW5PbmhFR3VIeWhjV0U3TEpsek41RUZVcW5qV0ZKLUJVYTFUMzhnWnRJX19SbHdDTGxjcXo4Y2wzMTdERE1QWEliY1dtZTBlUFBGVXR3Ty1tT3RIV2hMMzBMVEhpTjZ1YndBNWVIbW12M2VGT19SdktiOVdUalp3b0hHbXF5cDc1TDU4MmlnLWNLSE8tNDRTc0syX2F0THlZRnBGT3VKYXh1RFl3cVZnREdoWkgxa3hzci00RXN1ZmRyMmZkcHRWc3p1S1E2TFhuQXFsRHpUUVhsVldhanJmekh2VUI1OUVySGw0VVg3ZGZkQUZZWk1IUGMwZXE0UnJXbkxJdVZENXhwZTRGbFpZQmFHa3pOMnFmSElCdzdlX01ubFhIdXN6dmFoUEp4aFo4TllNcUN6QWowZVV2bmRCdU9PMVhqTm1uZUtla0tiOVFRQTFfUUhfaS1RQ01kV0VHcVNGLVVoUzRHT0ttZHdLNmJIVU5WTzVYXzdJWU9UeUtWMDdoN1JnM0NDNWJBUUlQSUtMZFlFWmRrR1FxeldiUTRnWWZqM09yaTlUczdfY3M5bUk4dm9OQmg1bEFzdk5UQjJyUnpnakZlb3V4V1NGenNfZmwwNnVkOHp2WnFTRGF3VEdIaU9ja0JfZEF1bFVmV0FYQlZ1UUxDaDlVQWNScUpJSUNoUDZIbEw4bXVQXzgxUE9YcFd4SUJQMkJVU1hmUVgxYnBXY3Fad1poMVBLZEhqYTJuNmxJbkJ5djNsR2Y1LVB2aUpfX2Fkb25IR2I3MXJMUzJDaFo4S3A4aFFFVElhdGlpLUNsSVllVS1kX2dYLXdpeEpLR0JyZFREUXFfRTRXVldVWnNMandEQTN0dWV2a0l4VE9TcWFvWnBzakFvZHA2ZmJZalc5blRobUh6QkdVc09HWTdTeFlUOGFRM3JIdXI2cW4xVU55cDZ6VXNodkVUX2xheUE1cDV2bUt2RkN2X0VmaU56YjZBYTNEa09ZRUdMeE4wZTNtNU5hdk80QlJCM2FycjRIOXVVRE11em8xdVBwZ1hSZE5ubVlxd0J2Yzl5LWlnMVg5aE9NMHh1dXhmX2RQMEt3cmlDMndxT1NJRXQzSExJcjMwTVZhXzl4U2k3Mk15NzdEb1ItVG1nQWtpeWZkanlnRGVUTUxaYzdyN0VXaVNhVGNRYkZ2UjFmNXhka0VpMGhSanZnUlhvZjdqUk1qbDVCLU1ybktxMldReXJkQ3Nfb0ZXbC1rY1V0MWtQTngweFZJVWFxRl9ib0UxbWhUZHo4Vkx0WVJheDdfbnZwQkxOZEQ2TWVXTmhYeXhCMkM2aURIV2dudy1HQmd0VGhNSkNjOVVLWTJUV291QmVvNU5OSV9lVjNxOHpsd3Ftb2FNR29fWThlel9xb2owM29CbEhZUEpYSllidzVScUEweS05elBfQUFwQndRanJSOHRKWklEcHV0VFlBQmYybHViR3lTdE13SWZkQ0N3Zms4MERmLU93cENtM2htRXp3MEl4eHM4ODNxLThYdFB3c2dta3hhRU9nOGwyQXg3Um1XQXctR05VVUxhanlPbUlGV082eGhnck5xRk5nQ2lETGFEZF9BZFFqSXVMbFV4dld1UEU1U1hrbkx2NjZMdDZtOWZ2b0RnMlktdnB1elN4TVhUU1phOGpaa0JOR1VRTkJaMzEzTFdmMTdEeXFPNVZuZDJOQmxYQ0s1cXA5OW5IR3JSVGZROW85XzJQd0JlN3ROVXpTcTFtbGpzbHV2SXJ4QWVXN1dPcHlXV045U01ORmRhSWtaNEd3WWd3YnJTSEJWVkpEZHJDeXFxT1ZUQTdqaE1GZC1WcFRJdlRObS1FblVZUTBnYmdtUWNhWkZjZjduNFo2UDZSZFFjY0tISGtWTmxwNUVYY0lCNzV1S3NidFRvVU1kRlMzRHZKRDdkWjlZYzh4dkN5M3RScldWWDVaWUVuQmxXU1lKT25yOGlFNU83NDhYYmpGaU5ORkJXRkotS3BtWHJFRjVXLVB6QUtUYTlORU0yT0FrRVNJNFk1RU96U3hJMVA2QjVRQ0hLelUtM1JPek9hcVBVeWJMNWw3VDRDa0lMQ19kQ05JRDRmd2V5NzBLMlpfazRRQ3o2MWF3Wk1JWnJscG5OV1JkQ0NSMFJsQ2ZJY2JXNzlMakhrdFQxLXJTcERhcG9xcXRHUWZDb25USzRkemtFUk1WTDMyemNVRGVJM3ZTVXF4TkQ0NWVOU01yQ0djYVgxaDdnYkpQbnNUMU50X2Rpa0E1bDFaVVYzNWJZSWN5YXB2UG0zNm9RcWc3MmJxSnUwQUxmVFFSckFhQ08ydWh1MmpzU21aRmlwYVRveHZmVzlNTFVDZi1NQS5CMzZuSFFLMmdaQjhWRWlaRE1vOVJnIiwiY29udGVudEVuY3J5cHRpb25LZXkiOiJleUpoYkdjaU9pSlFRa1ZUTWkxSVV6VXhNaXRCTWpVMlMxY2lMQ0psYm1NaU9pSkJNalUyUjBOTklpd2lZM1I1SWpvaWRHVjRkQzl3YkdGcGJpSXNJbkF5WXlJNk1qRXdNREF3TENKd01uTWlPaUpMVEhadmMweEdUVmhGWkdaVk4zbFZhRkJvVWkxSWVFVkpjRTUxWldKellWaFZNalpOV205cllqZzRJbjAuRm5NRjRDaHRnb2ZuWGpUVVFod0Fwb1ZZWDMzUVRsYU9ISkJYTzFNaEpmWWV4Skw5V3Z4d1V3LnRlczZZSDJvUWRxU2pXMkYuZ0M5d3dOMzRkal9oVDFPMnFudDB0WW5laWRuTDFGeG5EcHZaaHg2X05iLWtwX1VYWFN0SHNuYWNka2c4VzZoeVdPSUg2R09WOWduX1JmOGpYejBybEo2THloZG1JUmlPTW9nVXRmbkkzcUlJbFc4b2puRFFjUXRLeFQ0UkxHWWJ1YzZSQU1hT2wxTDQyaXV1WExCbkRQdXFwa3lXdExFQVAxcEdlVW5TTnRlYm9XSS45dWdZRVNCbmRtakdBeVNfWkt2MjhRIiwic3RhdHVzIjp7ImluaXRpYWxpemVkIjp0cnVlLCJsYXN0QmFja3VwIjoiMjAyNC0xMC0wOFQyMjoxOTozMi40MjhaIiwibGFzdFJlc3RvcmUiOiIyMDI0LTEwLTA4VDIyOjIyOjI3LjM4OVoifX0';

    console.log('Agent URI before restore:', agent.agentDid.uri);

    const identities = await agent.identity.list();
    console.log('Identities:', identities);

    for (let i = 0; i < identities.length; i++) {
      const identity = identities[i];
      await agent.identity.delete({ didUri: identity.did.uri });
    }

    await agent.vault.restore({ backup: backup, password: password });

    const agentDidFromVault = await agent.vault.getDid();

    console.log('Agent DID from vault:', agentDidFromVault);

    console.log('Agent URI after restore:', agent.agentDid.uri);

    const identities2 = await agent.identity.list();
    console.log('Identities after import:', identities2);

    // const options2 = await agent.sync.getIdentityOptions(result.did);
    // console.log('Identity Options2:', options2);

    // const identities = await agent.identity.list();
    // console.log('Identities:', identities);

    // const identity = identities[0];
    // const exportedIdentity = await identity.export();
    // console.log('Exported Identity:', exportedIdentity);

    // await agent.identity.delete({ didUri: result.did });

    // const portableUserDid = await agent.identity.export({ didUri: result.did });
    // console.log('Portable User DID:', portableUserDid);

    await agent.sync.startSync({ interval: '2s' });

    setTimeout(async () => {
      const identities = await agent.identity.list();
      console.log('Identities:', identities);
    }, 10000);

    // await agent.did.import({ portableDid: portableUserDid.portableDid });
  }

  exportDid(num: number) {}

  async dwnRead() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { record, status } = await this.identity.web5.dwn.records.read(request);

    console.log('Status:', status);
    console.log('Records:', record);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(record, null, 2);
  }

  async dwnQuery() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { records, status } = await this.identity.web5.dwn.records.query(request);

    console.log('Status:', status);
    console.log('Records:', records);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(records, null, 2);
  }

  async dwnWrite() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { record, status } = await this.identity.web5.dwn.records.create(request);

    console.log('Status:', status);
    console.log('Record:', record);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(record, null, 2);
  }
}

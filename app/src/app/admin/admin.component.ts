import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { registry } from '../../protocols';
import { AdminService } from '../admin.service';
import { LayoutService } from '../layout.service';
import { IdentityService } from '../identity.service';
import { CommonModule } from '@angular/common';

interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private http = inject(HttpClient);
  identity = inject(IdentityService);
  admin = inject(AdminService);
  layout = inject(LayoutService);

  roles = signal<string[]>([]);
  payments = signal<Payment[]>([]);
  isLoadingPayments = signal<boolean>(false);

  constructor() {
    this.layout.marginOff();
    // this.refreshPayments(); // Load payments on init
  }

  apiKey = '';

  handleApiKeyChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.apiKey = inputElement.value;
    this.refreshPayments();
  }

  async refreshPayments() {
    if (!this.apiKey) {
      return;
    }

    this.isLoadingPayments.set(true);
    try {
      const response = await fetch(`https://pay.ariton.app/payments/incoming/?apikey=${this.apiKey}&all=true`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as Payment[];
      this.payments.set(data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      this.payments.set([]);
    } finally {
      this.isLoadingPayments.set(false);
    }
  }

  async givePermissions() {
    for (let did of this.admin.getAdminDids()) {
      await this.givePermission(did);
    }
  }

  async logPermissions() {
    const did = this.admin.getIdentifierForApp('registries');

    // Assign collaborator role to the DID.
    const tags = {
      role: true,
    };

    // const query = {
    //   from: did,
    //   filter: {
    //     tags: tags,
    //     // protocol: registry.uri,
    //     // parentContextId: record.contextId, // Make the role a child of the list.
    //     // protocolPath: 'list/collaborator',
    //     // protocolPath: 'profile',
    //     // schema: registry.definition.types.profile.dataFormats.types.collaborator.schema,
    //     // dataFormat: taskDefinition.types.collaborator.dataFormats[0],
    //   },
    // };

    // console.log('QUERY:', query);

    const query = {
      from: did,
      message: {
        filter: {
          tags: tags,
          // protocol: registry.uri,
          // protocolPath: 'profile',
          // dataFormat: 'application/json',
        },
      },
    };

    // This will fail if the DID already have a role assigned.
    // TODO: Implement a query to see if the user already has role assigned and skip this step.
    const { records, status } = await this.identity.web5.dwn.records.query(query);

    if (records && records.length > 0) {
      this.roles.set(records.map((record) => record.recipient));
    }

    console.log('!!!!!');
    console.log('Role status:', status);
    console.log('Role record:', records);
  }

  async logRecords() {
    const did = this.admin.getIdentifierForApp('registries');

    const { records, status } = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    console.log('Status:', status);
    console.log('Records:', records);

    // if (records) {
    //   // Loop through returned records and print text from each
    //   records.forEach(async (record) => {
    //     const { status: deleteStatus } = await record.delete({ store: false });
    //     const { status: sendStatus } = await record.send(did);
    //     console.log('Delete status:', deleteStatus);
    //     console.log('Delete send status:  ', sendStatus);
    //   });
    // }
  }

  async givePermission(did: string) {
    // Assign collaborator role to the DID.
    const tags = {
      role: true,
    };

    // const query = {
    //   data: {},
    //   message: {
    //     tags: tags,
    //     recipient: collaborator,
    //     protocol: taskDefinition.protocol,
    //     parentContextId: record.contextId, // Make the role a child of the list.
    //     // protocolPath: 'list/collaborator',
    //     protocolPath: 'list/collaborator',
    //     schema: taskDefinition.types.collaborator.schema,
    //     // dataFormat: taskDefinition.types.collaborator.dataFormats[0],
    //   },
    // };

    const query = {
      store: false,
      data: {},
      message: {
        tags: tags,
        recipient: did,
        protocol: registry.uri,
        // parentContextId: record.contextId, // Make the role a child of the list.
        // protocolPath: 'list/collaborator',
        schema: 'https://schema.ariton.app/name/admin',
        protocolPath: 'admin',
        // protocolRole: 'profile/admin',
        // schema: registry.definition.types.profile.dataFormats.types.collaborator.schema,
        // dataFormat: taskDefinition.types.collaborator.dataFormats[0],
      },
    };

    console.log('QUERY:', query);

    // This will fail if the DID already have a role assigned.
    // TODO: Implement a query to see if the user already has role assigned and skip this step.
    const { record: roleRecord, status: roleStatus } = await this.identity.web5.dwn.records.create(query);

    const ownerDid = this.admin.getIdentifierForApp('registries');
    const { status: sendStatus } = await roleRecord!.send(ownerDid);

    console.log('Send status:', sendStatus);

    console.log('!!!!!');
    console.log('Role status:', roleStatus);
    console.log('Role record:', roleRecord);
  }

  async deleteRegistries() {
    const did = this.admin.getIdentifierForApp('registries');

    const { records, status } = await this.identity.web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: registry.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      },
    });

    console.log('Load status:', status);
    console.log('Deleting:  ', records);

    if (records) {
      // Loop through returned records and print text from each
      records.forEach(async (record) => {
        const { status: deleteStatus } = await record.delete({ store: false });
        const { status: sendStatus } = await record.send(did);
        console.log('Delete status:', deleteStatus);
        console.log('Delete send status:  ', sendStatus);
      });
    }

    console.log('Deleted registries.');
  }

  async writeRecord(did: string, data: any) {
    data.owner = did;

    let { status, record } = await this.identity.web5.dwn.records.create({
      store: false,
      data: data,
      message: {
        published: true, // Admin account publish for everyone to see.
        protocol: registry.uri,
        protocolPath: 'profile',
        protocolRole: 'admin',
        dataFormat: 'application/json',
        tags: {
          module: 'registries',
        },
      },
    });

    if (record) {
      const { status: sendStatus } = await record.send(did);
      console.log('Send status:', sendStatus);
    } else {
      console.warn('Failed to write record: ', data);
    }
  }

  async fillRegistries() {
    const did = this.admin.getIdentifierForApp('registries');

    // During development, we will populate the registry protocol with local dummy data. In the future,
    // data will be retrieved from one or multiple official registries (DWNs).

    await this.deleteRegistries();

    await this.writeRecord(did, {
      registry: 'gaianet',
      name: 'Gaianet Ecosystem',
      title: 'Project galary from Gaianet Ecosystem',
      description: 'Use Gaianet to find the regenerative projects, places, products, knowledge and tools you need.',
      url: 'https://www.gaianet.earth/',
      icon: 'https://images.squarespace-cdn.com/content/v1/5f19985874011d5032b0bf8e/1615319719509-BJHSX0FA2FRN837UG9I6/gaianet-logo.png?format=500w',
    });

    await this.writeRecord(did, {
      registry: 'bsn',
      name: 'Blockchain Social Network (BSN)',
      title: 'Stellar blockchain data registry',
      description: 'Used by the Montelibero project to build a social network on the Stellar blockchain.',
      url: 'https://ariton.app',
      icon: 'https://ariton.app/assets/ariton-favicon.png',
    });

    await this.writeRecord(did, {
      registry: 'podcast',
      name: 'Podcasts',
      title: 'Curated list of podcasts',
      description: 'Podcasts related to Ariton.',
      url: 'https://ariton.app',
      icon: 'https://ariton.app/assets/ariton-favicon.png',
    });

    await this.writeRecord(did, {
      registry: 'free-citadels',
      name: 'Free Citadels',
      title: 'Database of freedom communities',
      description: 'Explore the organisations that plan and build freedom communities.',
      url: 'https://freecitadels.com/',
      icon: 'https://unicorn-cdn.b-cdn.net/7a9da0d8-981c-484c-9640-1c65fbd0616b/free-citadels-logo.png?width=70&height=70',
    });

    await this.writeRecord(did, {
      registry: 'free-citadels',
      name: 'Free Citadels',
      title: 'Database of freedom communities',
      description: 'Explore the organisations that plan and build freedom communities.',
      url: 'https://freecitadels.com/',
      icon: 'https://unicorn-cdn.b-cdn.net/7a9da0d8-981c-484c-9640-1c65fbd0616b/free-citadels-logo.png?width=70&height=70',
    });

    await this.writeRecord(did, {
      registry: 'terra-registry',
      name: 'Terra Registry',
      title: 'Registry of free territories',
      description:
        'Anyone, anywhere, can declare their piece of land as a free territory. This is a registry of all free territories on Earth.',
      url: '',
      icon: 'data:image/png;base64,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',
    });

    await this.writeRecord(did, {
      registry: 'liberstad-cc',
      name: 'Liberstad CC',
      title: 'Crypto Company Registry',
      description:
        'CC are companies that exists on the City Chain blockchain and operate independently outside of national and state borders and boundaries.',
      url: 'https://www.liberstad.cc',
      icon: 'https://www.liberstad.cc/liberstad-square-512x512.png',
    });

    await this.writeRecord(did, {
      registry: 'local-company-registry',
      name: 'Local Company Registry',
      title: 'Registry of companies in your local area.',
      description: 'Helps local businesses to be found and to find other local businesses to work with.',
      url: '',
      icon: '/icons/apps/local-company-registry.jpg',
    });

    await this.writeRecord(did, {
      registry: 'freeid',
      name: 'FreeID',
      title: 'Unchain Your Identity in the New Free World',
      description:
        'FreeID is a revolutionary, decentralized identity system designed for individuals who value freedom and autonomy worldwide. Developed by the FreeID Foundation, established under the auspices of the World Voluntaryist Organization, FreeID offers a global solution for those seeking sovereignty over their personal identity. Serving as a parallel identity system within the New Free World, FreeID empowers individuals with a secure and cryptographically protected means of asserting their autonomy.',
      url: 'https://www.freeid.me/',
      icon: 'data:image/png;base64,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dTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAC4jAAAuIwF4pT92AAAFvmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjExIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMjVUMDM6MDM6MTMrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDgtMjVUMDM6MTA6MjMrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA4LTI1VDAzOjEwOjIzKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNDA5NzVhNy1hZDU2LTEzNGItOTM5MC1iMTAwODY4ZjdmYzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTE4YWFmMTAtY2FmZi1kNjRkLWJiZjEtMTQ1NDFi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',
    });

    await this.writeRecord(did, {
      registry: 'liberstad-land-registry',
      name: 'Liberstad Land Registry (LLR)',
      title: 'Registry of land in Liberstad',
      description:
        'For property ownership to be formally recognized, it must be voluntarily registered with the Liberstad Land Registry (LLR). The LLR facilitates transparency and documentation, ensuring that property rights are clearly defined and respected within the community.',
      url: '',
      icon: 'https://www.liberstad.cc/liberstad-square-512x512.png',
    });
  }

  // Community methods
  async logCommunities() {
    // Implement community logging logic
    console.log('Logging communities...');
  }

  async deleteCommunities() {
    // Implement community deletion logic
    console.log('Deleting communities...');
  }

  async fillCommunities() {
    // Implement community population logic
    console.log('Populating communities...');
  }
}

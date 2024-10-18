import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdentityService } from '../identity.service';
import { LayoutService } from '../layout.service';
import { AppService } from '../app.service';
import { BearerIdentity } from '@web5/agent';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  identity = inject(IdentityService);

  layout = inject(LayoutService);

  app = inject(AppService);

  router = inject(Router);

  currentIdentity: BearerIdentity | undefined;

  editing = false;

  constructor(private route: ActivatedRoute) {
    this.layout.marginOn();
    effect(async () => {
      if (this.app.initialized()) {
        this.route.params.subscribe(async (params) => {
          //   const source = params['source'];
          const id = params['id'];

          const identity = await this.identity.activeAgent().identity.get({ didUri: id });
          this.currentIdentity = identity;

          //   console.log(this.registryService);

          //   this.entry = this.registryService.bsn.accounts.find((account) => {
          //     return account.id === id;
          //   });

          //   console.log(this.entry);
        });
      }
    });
  }

  async activateAccount() {
    // Change the active DID.
    await this.identity.changeAccount(this.currentIdentity!.did.uri);

    this.router.navigate(['/accounts']);
  }

  title: string | undefined;

  editAccount() {
    this.title = this.currentIdentity?.metadata.name;
    this.editing = true;
  }

  async saveAccount() {
    const identity = this.currentIdentity!;

    identity.metadata.name = this.title!;

    // First delete as we cannot update.
    // await this.identity.store.delete({ id: identity.metadata.uri, agent: this.identity.activeAgent() });

    // TODO: This is not possible as of today: https://github.com/TBD54566975/web5-js/issues/696

    // Set the updated identity.
    await this.identity.store.set({
      id: identity.metadata.uri,
      data: identity.metadata,
      agent: this.identity.activeAgent(),
      tenant: identity.metadata.tenant,
      preventDuplicates: true,
      useCache: true,
    });

    this.editing = false;
  }

  async backupAccount() {
    const portableIdentity = await this.currentIdentity?.export();
    if (portableIdentity) {
      const blob = new Blob([JSON.stringify(portableIdentity)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portableIdentity.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  async deleteAccount() {
    await this.identity.activeAgent().identity.delete({ didUri: this.currentIdentity!.did.document.id });
    this.router.navigate(['/accounts']);
  }
}

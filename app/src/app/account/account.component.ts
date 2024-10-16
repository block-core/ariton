import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdentityService } from '../identity.service';
import { LayoutService } from '../layout.service';
import { AppService } from '../app.service';
import { BearerIdentity } from '@web5/agent';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatTooltipModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  identity = inject(IdentityService);

  layout = inject(LayoutService);

  app = inject(AppService);

  currentIdentity: BearerIdentity | undefined;

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

  deleteAccount() {}
}

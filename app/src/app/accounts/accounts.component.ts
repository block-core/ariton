import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutService } from '../layout.service';
import { AppService } from '../app.service';
import { BearerIdentity } from '@web5/agent';
import { IdentityService } from '../identity.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  layout = inject(LayoutService);

  identityService = inject(IdentityService);

  app = inject(AppService);

  identities: BearerIdentity[] = [];

  constructor() {
    this.layout.marginOn();

    effect(async () => {
      if (this.app.initialized()) {
        await this.load();
      }
    });
  }

  async load() {
    const agent = this.app.identity.activeAgent();

    const identities = await agent.identity.list();

    // Refresh the list of identities. After user delete accounts, they are redirected here.
    this.identityService.identities = identities;

    this.identities = identities;
    console.log('Identities:', identities);
  }

  save() {}

  undo() {}
}

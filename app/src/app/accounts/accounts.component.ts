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

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
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
    this.identities = identities;
  }

  save() {}

  undo() {}
}

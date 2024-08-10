import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { SettingsState, SettingsStateService } from '../settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../identity.service';
import { DidResolutionResult } from '@web5/dids';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsStateService],
})
export class SettingsComponent {
  debug = this.settingsState.select('debug');

  identity = inject(IdentityService);

  layout = inject(LayoutService);

  document = signal<DidResolutionResult | undefined>(undefined);

  nodes = signal<any>([]);

  readonly settings = this.settingsState.state.asReadonly();

  constructor(private settingsState: SettingsStateService) {
    this.layout.resetActions();

    effect(() => {
      if (this.identity.initialized()) {
        this.loadDIDDocument();
      }
    });
  }

  async loadDIDDocument() {
    const document = await this.identity.web5.did.resolve(this.identity.did);
    this.document.set(document);

    let nodes = document.didDocument?.service?.filter((service) => service.type === 'DecentralizedWebNode');
    this.nodes.set(nodes);
  }

  toggleDebug() {
    // Update single property
    //this.settingsState.set('debug', !this.settings().debug);

    // Update full or partial state
    this.settingsState.setState({ debug: !this.settings().debug } as SettingsState);
  }
}

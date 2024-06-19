import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsState, SettingsStateService } from '../settings.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsStateService]
})
export class SettingsComponent {

  debug = this.settingsState.select('debug');

  readonly settings = this.settingsState.state.asReadonly();

  constructor(private settingsState: SettingsStateService) {

  }

  toggleDebug() {
    // Update single property
    //this.settingsState.set('debug', !this.settings().debug);

     // Update full or partial state
     this.settingsState.setState({ debug: !this.settings().debug } as SettingsState);
  }
}

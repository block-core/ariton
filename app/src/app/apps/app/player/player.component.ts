import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';
import { PlayerService } from '../../../player.service';
import { QueueEditorComponent } from './queue-editor/queue-editor.component';

@Component({
    selector: 'app-player',
    imports: [MatButtonModule, QueueEditorComponent],
    templateUrl: './player.component.html',
    styleUrl: './player.component.scss'
})
export class PlayerComponent {
  layout = inject(LayoutService);

  player = inject(PlayerService);

  cd = inject(ChangeDetectorRef);

  constructor() {
    this.player.onTimeUpdate((currentTime: number) => {
      this.cd.detectChanges();
    });
  }

  toggleTray() {
    this.layout.tray.set(!this.layout.tray());
  }
}

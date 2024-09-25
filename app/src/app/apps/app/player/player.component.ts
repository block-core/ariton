import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';
import { PlayerService } from '../../../player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
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

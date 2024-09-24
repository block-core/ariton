import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  layout = inject(LayoutService);

  constructor() {}

  toggleTray() {
    this.layout.tray.set(!this.layout.tray());
  }
}

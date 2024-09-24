import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../../../layout.service';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class PlayerControlsComponent {
  layout = inject(LayoutService);

  closeTray() {
    this.layout.tray.set(false);
  }
}

import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.scss',
})
export class PodcastComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }

  apply() {}
}

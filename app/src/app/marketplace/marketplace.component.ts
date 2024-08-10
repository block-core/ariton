import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
})
export class MarketplaceComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.resetActions();
  }
}

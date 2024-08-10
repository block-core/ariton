import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.resetActions();
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'app-storage',
    imports: [
        MatChipsModule,
        MatIconModule,
        MatButtonToggleModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './storage.component.html',
    styleUrl: './storage.component.scss'
})
export class StorageComponent {
  premiumPeriod = 'monthly';

  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }
}

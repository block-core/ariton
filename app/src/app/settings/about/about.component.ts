import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../app.service';
import { MatListModule } from '@angular/material/list';
import { HashService } from '../../hash.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatListModule, CommonModule, MatTooltipModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  appService = inject(AppService);

  hash = inject(HashService);

  timestamp: string | null = '';

  ngOnInit() {
    this.timestamp = this.hash.getTimestamp();
  }
}

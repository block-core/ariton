import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AgoPipe } from '../shared/pipes/ago.pipe';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [AgoPipe, MatCardModule, MatButtonModule, MatTabsModule, MatIconModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {}

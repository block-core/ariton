import { Component, effect, inject, signal } from '@angular/core';
import { ConnectionService } from '../../connection.service';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { ConnectionComponent } from './connection.component';
import { RequestComponent } from './request.component';

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [
    RequestComponent,
    ConnectionComponent,
    ProfileHeaderComponent,
    AgoPipe,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
})
export class ConnectionsComponent {
  connection = inject(ConnectionService);

  app = inject(AppService);

  constructor() {}
}
